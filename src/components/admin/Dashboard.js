import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { startSetUsers } from '../../actions/userAction'
import Profile from './Profile'
import { connect } from 'react-redux'

function AdminDashboard(props) {
    if (props.users.length == 0) {
        props.dispatch(startSetUsers())
    }
    return (
        <Container>{console.log("props dash", props.users)}
            {props.users ? (
                <div>
                    <h2 style={{ marginTop: "15px" }}>Admin Dashboard</h2>

                    <Tabs defaultActiveKey="FrontEndDeveloper" variant="pills"
                        id="uncontrolled-tab-example">
                        <Tab eventKey="FrontEndDeveloper" title="FrontEndDeveloper"
                            variant="pills" >
                            <Profile type="Front-End Developer" applicants={props.users.filter(
                                user => user.jobTitle == 'Front-End Developer')} />
                        </Tab>
                        <Tab eventKey="NodejsDeveloper" title="NodejsDeveloper">
                            <Profile type="Node.js Developer" applicants={props.users.filter(
                                user => user.jobTitle == 'Node.js Developer')} />
                        </Tab>
                        <Tab eventKey="MEANStackDeveloper" title="MEANStackDeveloper" >
                            <Profile type="MEAN Stack Developer" applicants={props.users.filter(
                                user => user.jobTitle == 'MEAN Stack Developer')} />
                        </Tab>
                        <Tab eventKey="FULLStackDeveloper" title="FULLStackDeveloper" >
                            <Profile type="FULL Stack Developer" applicants={props.users.filter(
                                user => user.jobTitle == 'FULL Stack Developer')} />
                        </Tab>
                    </Tabs>
                </div>
            ) : (
                    <div>
                        <p>loading</p>
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
export default connect(mapStateToProps)(AdminDashboard)
