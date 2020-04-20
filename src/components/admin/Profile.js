import React from 'react'
import { Table, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { startSetUsers, startUpdateStatus } from '../../actions/userAction'

function Profile(props) {
    console.log("props profile", props)
    if (props.users.length == 0) {
        props.dispatch(startSetUsers())
    }
    const handleUpdate = (status, id) => {
        console.log("status", status)
        console.log("user_id", id)
        const redirect = () => props.history.push('/')
        props.dispatch(startUpdateStatus(status, id, redirect))
    }
    const handleShow = (user) => {
        console.log("id", user)
        swal(
            <div>
                <Table style={{ textAlign: 'left' }} >
                    <thead>
                        <tr>
                            <th style={{ borderTopStyle: 'none' }}>
                                {user.name} Profile
                             </th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td >Conact Number</td>
                            <td > {user.phone}</td>
                        </tr>
                        <tr>
                            <td style={{ borderTop: "0px solid #fff" }}>Email</td>
                            <td style={{ borderTop: "0px solid #fff" }}> {user.email}</td>
                        </tr>
                        <tr>
                            <td style={{ borderTop: "0px solid #fff" }}>Skills</td>
                            <td style={{ borderTop: "0px solid #fff" }}>{user.skills}</td>
                        </tr>
                        <tr>
                            <td style={{ borderTop: "0px solid #fff", borderBottom: "2px solid #dee2e6" }}>Experience</td>
                            <td style={{ borderTop: "0px solid #fff", borderBottom: "2px solid #dee2e6" }}> {user.experience}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

    return (
        <Container>
            {props.users ? (
                <div>
                    <h3 style={{ marginTop: "50px" }}>{props.type}</h3>
                    <h6>List of candidates applied for {props.type} job</h6>
                    <Table responsive style={{ marginTop: "15px" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Technical Skills</th>
                                <th>Experience</th>
                                <th>Applied Date</th>
                                <th>View Details</th>
                                <th>Update Application Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.applicants.map((user, i) => (
                                <tr key={i}>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.skills}
                                    </td>
                                    <td>
                                        {user.experience}
                                    </td>
                                    <td>
                                        {(new Date(user.createdAt)).
                                            toLocaleDateString()}
                                    </td>
                                    <td>
                                        <Button variant="info" onClick={() => {
                                            handleShow(user)
                                        }}>
                                            View Details
                                            </Button>
                                    </td>
                                    <td>

                                        {
                                            user.status == 'shortlisted' ?
                                                <Button variant="success">
                                                    shortlisted
                              </Button> :
                                                user.status == 'rejected' ?
                                                    <Button variant="danger">
                                                        Rejected
                             </Button> :
                                                    <div >

                                                        <Button variant="success" onClick={() => {
                                                            const status = {
                                                                status: 'shortlisted'
                                                            }
                                                            handleUpdate(status, user._id)
                                                        }}>
                                                            Shortlist
                               </Button>
                                                        {' '}
                                                        <Button variant="danger" onClick={() => {
                                                            const status = {
                                                                status: 'rejected'
                                                            }
                                                            handleUpdate(status, user._id)
                                                        }}>
                                                            Reject
                               </Button>
                                                    </div>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                    <div>
                        <p>loading....</p>
                    </div>
                )}
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(Profile)
