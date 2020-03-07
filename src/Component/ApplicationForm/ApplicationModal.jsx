import React, { Component, Fragment } from 'react'
import UserForm from './ApplicationForm'
import { Modal,Button } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { startSetUser } from '../../Action/user';

class ApplicationModal extends Component {
    constructor(props){
        super(props)
        this.state = {
          isVisible: false,
          name: "",
          email: "",
          phone: "",
          jobTitle: "",
          experience: "",
          skills: ""
        };
    }

    handleClose=()=>{
        this.setState({isVisible:!this.state.isVisible})
    }

handleSubmit=()=>{
    const formData = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      jobTitle: this.state.jobTitle,
      experience: this.state.experience,
      skills: this.state.skills
    };
    this.props.dispatch(startSetUser(formData));
}

handleChange=(e)=>{
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    });
}

    render() {
        return (
          <Fragment>
            <div style={{ textAlign: "center",backgroundColor:"crimson" }}>
              <StyledButton type="link" onClick={this.handleClose}>
                Apply Job
              </StyledButton>
              <Modal
                visible={this.state.isVisible}
                centered
                footer={null}
                onCancel={this.handleClose}
                width="50rem"
                bodyStyle={{
                  height: "40rem"
                }}
              >
                <UserForm
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  email={this.state.email}
                  phone={this.state.phone}
                  name={this.state.name}
                  experience={this.state.experience}
                  jobTitle={this.state.jobTitle}
                  skills={this.state.skills}
                />
              </Modal>
            </div>
          </Fragment>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        users:state.user
    }
}
export default connect(mapStateToProps)(ApplicationModal);
const StyledButton=styled(Button)`
 color:#fff;
`;
