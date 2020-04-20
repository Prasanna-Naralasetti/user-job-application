import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './components/user/form'
import AdminDashboard from './components/admin/Dashboard'

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <div className="header" style={{ margin: "11px" }}>
          <div style={{ float: "left" }}>
            <h3>USER JOB APPLICATION</h3>
          </div>
          <br/>
          <br/>
          <Link to="/users/application-form">User</Link>
          <Link to="/admin/application-form-details">
            Admin
          </Link>
          {/* <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link active" to="/users/application-form">User</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/application-forms">Admin</Link>
            </li>
          </ul> */}
        </div>
        <Route
          path="/users/application-form"
          component={UserForm}
          exact={true}
        />
        <Route
          path="/admin/application-form-details"
          component={AdminDashboard}
          exact={true}
        />
      </div>
    </BrowserRouter>
  );
}
export default App
