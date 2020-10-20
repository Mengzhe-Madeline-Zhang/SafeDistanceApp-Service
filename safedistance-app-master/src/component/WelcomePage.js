import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './common/navbar/NavBar'
import AdminLogin from './admin/login/AdminLogin';
import AdminRegister from './admin/register/AdminRegister';
import AdminDashboard from './admin/dashboard/AdminDashboard'
import Landing from './common/LandingPage/Landing'
import Report from './user/Report/C19report'
import ActivateTable from './admin/activate-table/ActivateTable';
import Location from './common/Location/Location';

class WelcomePage extends Component {
  render() {

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Location/>
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/admin/register" component={AdminRegister} />
            <Route exact path="/admin/login" component={AdminLogin} />
            <Route exact path="/admin/dashboard" component={AdminDashboard} />
            <Route exact path="/admin/users" component={ActivateTable} />
            <Route exact path="/user/report" component={Report} />
          </div>
        </div>
      </Router>
    )

  }
}

export default WelcomePage

