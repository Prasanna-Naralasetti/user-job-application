import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux'
import { startSendUser } from '../../actions/userAction';
import swal from '@sweetalert/with-react'
import { withRouter } from 'react-router-dom'

class UserForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            skills: '',
            jobTitle: '',
            experience: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            skills: this.state.skills,
            jobTitle: this.state.jobTitle,
            experience: this.state.experience
        }
        console.log("formData", formData)
        const redirect = () => {
            return this.props.history.push('/home')
        }
        this.props.dispatch(startSendUser(formData, redirect))
        swal("Good job!", "You sent an application!", "success");
    }
    render() {
        return (
            <div style={{ backgroundColor: "#FF1493", height: "742px", marginTop: "13px" }}>
                <h5 style={{
                    color: "#fff", textAlign: "center",
                    paddingRight: "725px"
                }}>
                    Apply for job
                </h5>
                <Container style={{
                    width: "854px", backgroundColor: "#fff",
                    paddingTop: "35px", paddingLeft: "26px"
                }}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalName">
                            <Form.Label column sm={3}>
                                Full name
                        </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                Email address
                        </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="example@email.com" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalPhone">
                            <Form.Label column sm={3}>
                                Contact Number
                        </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="phone"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    placeholder="+91 9988554344" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalJobTitle">
                            <Form.Label column sm={3}>
                                Applying for Job
                        </Form.Label>
                            <Col sm={8}>
                                <Form.Control as="select"
                                    name="jobTitle"
                                    value={this.state.jobTitle}
                                    onChange={this.handleChange}>
                                    <option defaultValue>
                                        ----Select----
                                </option>
                                    <option>
                                        Front-End Developer
                                </option>
                                    <option>
                                        Node.js Developer
                                </option>
                                    <option>
                                        MEAN Stack Developer
                                </option>
                                    <option>
                                        FULL Stack Developer
                                </option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalExperience">
                            <Form.Label column sm={3}>
                                Experience
                        </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="experience"
                                    name="experience"
                                    value={this.state.experience}
                                    onChange={this.handleChange}
                                    placeholder="Experience( 2years 3 months)" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}
                            controlId="formHorizontalSkills">
                            <Form.Label column sm={3}>
                                Technical Skills
                        </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="TechnicalSkills"
                                    as="textarea" style={{ height: "120px" }}
                                    placeholder="Technical Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Col sm={{ span: 10, offset: 2 }}
                                style={{
                                    marginBottom: "50px",
                                    marginLeft: "0"
                                }}>
                                <Button type="submit">Send Application</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default withRouter(connect()(UserForm))
