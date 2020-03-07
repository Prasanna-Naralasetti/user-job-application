import React from "react";
import { Input, Form,Select } from "antd";
import { startSetUser } from "../../Action/user";
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      experience: "",
      skills: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit();
  };
  
  render() {
    const { Option } = Select
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Form.Item name="note" label="Note" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          
          <label>
            Full name
            <Input
              name="name"
              placeholder=""
              id="name"
              type="text"
              onChange={e => this.props.handleChange(e)}
            />
          </label>
          <br />
          <hr />
          <label>
            Email address
            <Input
              name="email"
              placeholder="example@gmail.com"
              id="email"
              type="text"
              value={this.props.email}
              onChange={e => this.props.handleChange(e)}
            />
          </label>
          <br />
          <hr />
          <label>
            Contact number
            <Input
              name="phone"
              placeholder="+91 7896541230"
              id="phone"
              type="text"
              value={this.props.phone}
              onChange={e => this.props.handleChange(e)}
            />
          </label>
          <br />
          <hr />
          {/* <Form.Item name="gender" label="Job">
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item> */}
          <br/>
          <hr/>
          <label>
            Apply For Job
            <select
              name="jobTitle"
              id="jobTitle"
              value={this.props.jobTitle}
              onChange={e => this.props.handleChange(e)}
            >
              <option value="select">select</option>
              <option value="FULL Stack Developer">FULL Stack Developer</option>
              {/* <option value="Front End Developer">Front End Developer</option>
              <option value="Back End Developer">Back End Developer</option>
              <option value="Node js Developer">FULL Stack Developer</option>
              <option value="MERN Developer">MERN Developer</option> */}
            </select>
          </label>
          <br />
          <hr />
          <label>
            Experience
            <Input
              name="experience"
              placeholder="experience(2years,3months)"
              id="experience"
              type="text"
              value={this.props.experience}
              onChange={e => this.props.handleChange(e)}
            />
          </label>

          <br />
          <hr />
          <label>
            Technical Skills
            <Input
              name="skills"
              placeholder="Technical Skills"
              id="skills"
              type="text"
              value={this.props.skills}
              onChange={e => this.props.handleChange(e)}
            />
          </label>
          <br />
          <br />
          <hr />
          <input type="submit" value="Send Application" />
        </form>
      </div>
    );
  }
}

export default UserForm;
