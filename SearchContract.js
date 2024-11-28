import React, { useEffect, useRef, useState } from "react";
import CustomButtons from "../common/CustomButtons";
import RadioButtons from "../common/RadioButtons";
import Dropdown from "../common/Dropdown";
import { categoryOptions } from "../../constants/dropDownOptions";
import { Box, Divider, Paper, Typography, Grid, Alert } from "@mui/material";
import ContractDetails from "./ContractDetails";
import AddIcon from "@mui/icons-material/Edit";
import BasicDetails from "./BasicDetails";
import CycleCheckbox from "./CycleCheckbox";
import PipeLineLocation from "./PipeLineLocation";
import DeliveryType from "./DeliveryType";
import { contracts } from "../../Data/DummyData";
import ContractPrintoutInfo from "./ContractPrintoutInfo";
import PaymentTerms from "./PaymentTerms";
import CustomTable from "./CustomTable";
import "./SearchContract.css";
import { WordDocumentData } from "./WordDocumentData";
import PricingDetails from "./PricingDetails";
import TimeSectionAlternateSeasonal from "./TimeSection";
import AlternateSeasonal from "./AlternateSeasonal";
import {
  categoryMapping,
  getCurrentDate,
  initialFormState,
  mapContractToFormState,
  mapContractToRowData,
} from "../../constants/initialState";

const SearchContract = () => {
  const [rows, setRows] = useState([]);
  const [formState, setFormState] = useState(initialFormState);
  const [isEditable, setIsEditable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMultiselectChange = (event, value) => {
    handleChange("cycle", value);
  };

  const handleChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
      ...(field === "selection" && { id: "" }), // Reset ID when selection changes
    }));
  };
  console.log("form Data", formState);
  const filteredContracts = contracts
    ? contracts.filter(
        (contract) =>
          contract.CONTRACT_TYPE_ID === categoryMapping[formState.category]
      )
    : [];

  const handlePrevContract = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevContract = filteredContracts[prevIndex];

      setCurrentIndex(prevIndex);
      setFormState((prevState) => ({
        ...prevState,
        selection:
          formState.category === "SEIbuys"
            ? prevContract.PURCHASE_CONTRACT_NUMBER
            : prevContract.SALES_CONTRACT_NUMBER,
      }));
    }
  };

  const handleNextContract = () => {
    if (currentIndex < filteredContracts.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextContract = filteredContracts[nextIndex];

      setCurrentIndex(nextIndex);
      setFormState((prevState) => ({
        ...prevState,
        selection:
          formState.category === "SEIbuys"
            ? nextContract.PURCHASE_CONTRACT_NUMBER
            : nextContract.SALES_CONTRACT_NUMBER,
      }));
    }
  };

  console.log("filteredContracts", filteredContracts);
  const selectionOptions = Array.isArray(filteredContracts)
    ? filteredContracts.map((contract) => ({
        value:
          formState.category === "SEIbuys"
            ? contract.PURCHASE_CONTRACT_NUMBER
            : contract.SALES_CONTRACT_NUMBER,
        label:
          formState.category === "SEIbuys"
            ? contract.PURCHASE_CONTRACT_NUMBER
            : contract.SALES_CONTRACT_NUMBER,
      }))
    : [];
  console.log("selectionOptions", selectionOptions);
  const idOptions = Array.isArray(filteredContracts)
    ? filteredContracts.map((contract) => ({
        value: contract.CONTRACT_ID,
        label: contract.CONTRACT_ID,
      }))
    : [];

  console.log("idOptions", idOptions);
  useEffect(() => {
    console.log("abovetrueIDParentsss");
    if (
      filteredContracts.length > 0 &&
      currentIndex >= filteredContracts.length
    ) {
      setCurrentIndex(filteredContracts.length - 1); // Reset to the last contract if out of bounds
    }
    if (formState.selection) {
      // Find the selected contract from 'contracts' array
      const selectedData = contracts.find(
        (item) =>
          item.PURCHASE_CONTRACT_NUMBER === formState.selection ||
          item.SALES_CONTRACT_NUMBER === formState.selection
      );

      if (selectedData) {
        setFormState((prevData) => ({
          ...prevData,
          ...mapContractToFormState(selectedData),
        }));
        setRows([mapContractToRowData(selectedData)]);
      }
    }

    console.log(
      "+++{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}+++++++++++++++++++++++",
      formState
    );
  }, [formState.selection, currentIndex]);

  const generateNewContractId = () => {
    return Math.floor(Math.random() * 10000); // Random ID generation example
  };
  const handleCopyContract = () => {
    console.log("copied Contract");
    setIsEditable(true);
    const newContractId = generateNewContractId();

    // Update form state with the new contract ID and add it to idOptions
    setFormState((prevState) => ({
      ...prevState,
      id: newContractId, // Set the new contract ID in the form
      selection: "",
      entryDate: getCurrentDate(),
      idOptions: [
        ...prevState.idOptions, // Keep previous options
        { value: newContractId, label: newContractId }, // Add the new ID to options
      ],
    }));
  };

  const handleDownloadWord = () => {
    console.log("handleDownloadWord Contract");
    WordDocumentData(formState);
  };

  const handleSaveContract = () => {
    setShowAlert(true);
    setIsEditable(false);
    console.log("handleSaveContract Contract");
  };
  const handleCreateContract = () => {
    setIsEditable(true);
    setFormState(initialFormState);
    setFormState({
      ...initialFormState,
      selection: "",
      entryDate: getCurrentDate(), // Set the current date when creating a new contract
    });
    setRows([
      {
        id: "",
        month: "",
        location: "",
        product: "",
        quantity: "",
        diff: "",
      },
    ]);
    console.log("handleSaveContract Contract");
  };

  return (
    <>
      {" "}
      <Box
        sx={{
          padding: 2,
          margin: 2,
          backgroundColor: "rgb(245,245,245)",
        }}
      >
        {showAlert && (
          <Alert severity="success">
            {`Contract ${formState.id} has been successfully saved to the new contract!`}
          </Alert>
        )}
        <Paper
          sx={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            boxShadow: "none",
            marginBottom: "8px",
          }}
        >
          <Typography variant="h5" sx={{ marginRight: "20px" }}>
            Search Contract
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}
          >
            <Box>
              <Typography
                sx={{ fontSize: 14 }}
                variant="body1"
                color="textSecondary"
              >
                Select Category
              </Typography>
              <RadioButtons
                value={formState.category}
                onChange={(e) => handleChange("category", e.target.value)}
                options={categoryOptions}
                isEditable={!isEditable}
              />
            </Box>

            <Dropdown
              value={formState.selection}
              onChange={(e) => handleChange("selection", e.target.value)}
              options={selectionOptions}
              label={
                formState.category === "SEIbuys"
                  ? "Search Purchases"
                  : "Search Sales"
              }
              isEditable={!isEditable}
              default={contracts[0].PURCHASE_CONTRACT_NUMBER}
            />
            <Dropdown
              value={formState.id}
              onChange={(e) => handleChange("id", e.target.value)}
              options={formState.idOptions ? formState.idOptions : idOptions}
              label="Select ID"
              isEditable={!isEditable}
            />
          </Box>

          <CustomButtons
            label="New Contract"
            width={"20%"}
            icon={<AddIcon />}
            sx={{ padding: "40px" }}
            onClick={handleCreateContract}
            // color="success"
          />
        </Paper>
        <ContractDetails
          title={formState.category === "SEIbuys" ? "SEI Buys" : "SEI Sells"}
          contracttypetitle={
            formState.category === "SEIbuys"
              ? "Purchase Contract Number"
              : "Sales Contract Number"
          }
          type={formState.selection} // Fallback if purchase is empty
          id={formState.id}
          entryDate={formState.entryDate}
          onCopyContract={handleCopyContract}
          onWordContract={handleDownloadWord}
          onSaveContract={handleSaveContract}
          handlePrevContract={handlePrevContract}
          //disabled={currentIndex <= 0}
          handleNextContract={handleNextContract}
        />

        <Divider />
        <Paper sx={{ padding: 2, marginBottom: 1, boxShadow: "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <BasicDetails
                formState={formState}
                handleChange={handleChange}
                isEditable={isEditable}
                title={
                  formState.category === "SEIbuys" ? "SEI Buys" : "SEI Sells"
                }
              />
            </Grid>
            <Grid sx={{ marginTop: 3 }} item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CycleCheckbox
                    value={formState.cycle}
                    onChange={handleMultiselectChange}
                    isEditable={isEditable}
                  />
                </Grid>
                <Grid item xs={4}>
                  <PipeLineLocation
                    value={formState.pipeline}
                    onChange={(e) => handleChange("pipeline", e.target.value)}
                    isEditable={isEditable}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DeliveryType
                    value={formState.deliveryType}
                    onChange={(e) =>
                      handleChange("deliveryType", e.target.value)
                    }
                    isEditable={isEditable}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTable
                    rows={rows}
                    setRows={setRows}
                    setFormState={setFormState}
                    isEditable={isEditable}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PaymentTerms
                formData={formState}
                handleChange={handleChange}
                isEditable={isEditable}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContractPrintoutInfo
                formData={formState}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Pricing Details */}
            <Grid item xs={6}>
              <PricingDetails
                formState={formState}
                handleChange={handleChange}
                isEditable={isEditable}
              />
            </Grid>

            {/* Other Details */}
            <Grid item xs={3}>
              <TimeSectionAlternateSeasonal
                formState={formState}
                handleChange={handleChange}
                isEditable={isEditable}
              />
            </Grid>

            {/* Empty Space or Future Components */}
            <Grid item xs={3}>
              <AlternateSeasonal
                formState={formState}
                handleChange={handleChange}
                isEditable={isEditable}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default SearchContract;
