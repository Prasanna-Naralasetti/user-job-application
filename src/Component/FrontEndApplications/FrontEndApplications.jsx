import React from "react";
import { connect } from "react-redux";
import { startGetUser } from "../../Action/user";

function FrontEndApplications(props) {
  const user = [...props.User];
  return (
    <div>
      {/* <h1>Front-End Developers</h1> */}
      <h1>{props.title}</h1>
      <h3>List of candidates applies for Fron-End</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Technical Skills</th>
            <th>Experience</th>
            <th>Applied Date</th>
            <th>View Details</th>
            <th>Update Apllication Status</th>
          </tr>
        </thead>
        <tbody>
          {user.map(userInfo => {
            return userInfo.map(ele => {
            return <div>{props.title}</div>  
            });
          })}
        </tbody>
      </table>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    User: state.user
  };
};
export default connect(mapStateToProps)(FrontEndApplications);
