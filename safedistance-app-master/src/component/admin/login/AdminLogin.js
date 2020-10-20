import React, { Component } from 'react'
import { login } from '../functions/AdminFunctions'
import { Link } from 'react-router-dom'

import './AdminLogin.scss';

class AdminLogin extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const admin = {
      email: this.state.email,
      password: this.state.password
    }

    login(admin).then(res => {
      if (res) {

        this.props.history.push(`/admin/dashboard`)

      }
    })
  }

  render() {
    return (

        <div className="inner_container">
        <ul className="inner_navbar">Login<big> | </big>
        <Link to="/admin/register" className="inner_navbar_button">
            Register
          </Link>
        </ul>
        
            <form noValidate className="noValidate" onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="👥  Email Address"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="🔒   Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="roundbutton">
                Login
              </button>
            </form>
          </div>
    )
  }
}

export default AdminLogin
