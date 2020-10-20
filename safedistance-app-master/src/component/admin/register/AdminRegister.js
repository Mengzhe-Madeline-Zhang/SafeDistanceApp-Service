import React, { Component } from 'react'
import { register } from '../functions/AdminFunctions';
import { Link } from 'react-router-dom'
import {FormWithConstraints,FieldFeedback,FieldFeedbacks} from 'react-form-with-constraints'
import './AdminRegister.scss';
//import * as React from 'react';
//import * as ReactDOM from 'react-dom';


// const {
//   FormWithConstraints,
//   FieldFeedbacks,
//   FieldFeedback
// } = ReactFormWithConstraints;

class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {}
    }

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.form.validateFields(e.target);
  }

  contactSubmit = e => {
    e.preventDefault();

    this.form.validateFields();

    if (!this.form.isValid()) {
      console.log('form is invalid: do not submit');
      this.props.history.push(`/admin/register`)
    } else {
      console.log('form is valid: submit');
      const newAdmin = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      }

      register(newAdmin).then(res => {
        if (res) {
          this.props.history.push('/admin/login')
        }
      })
      
    }
  }

  
  render() {
    return (
      <div className="inner_container">
         <ul className="inner_navbar"><Link to="/admin/login" className="inner_navbar_button">
            Login</Link>
            <big> | </big>
            Register
        </ul>
        <FormWithConstraints
          name="ValidateForm"
          ref={form => this.form = form}
          onSubmit={this.contactSubmit}
          noValidate>
            {/* <form name="ValidateForm" onSubmit={this.onSubmit}> */}
              <div className="form-group_2">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="👥  First name"
                  required
                  // value={this.state.first_name}
                  onChange={this.handleChange}
                />
                <FieldFeedbacks for="first_name">
              <FieldFeedback when="*" />
            </FieldFeedbacks>

              </div>
              <div className="form-group_2">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="👥  Last name"
                  required
                  onChange={this.handleChange}
                />
                <FieldFeedbacks for="last_name">
              <FieldFeedback when="*" />
            </FieldFeedbacks>
              </div>
              <div className="form-group_2">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="📧  Email Address"
                  required
                  onChange={this.handleChange}
                />
                <FieldFeedbacks for="email">
              <FieldFeedback when="*" />
            </FieldFeedbacks>
              </div>
              <div className="form-group_2">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="🔒   Password"
                  value={this.state.password}
                  required pattern=".{5,}"
                  onChange={this.handleChange}
                />
                
                  <FieldFeedbacks for="password">
                    <FieldFeedback when="valueMissing" />
                    <FieldFeedback when="patternMismatch">
                      Should be at least 5 characters long
                    </FieldFeedback>
                    <FieldFeedback when={value => !/\d/.test(value)} warning>
                      Should contain numbers
                    </FieldFeedback>
                    <FieldFeedback when={value => !/[a-z]/.test(value)} warning>
                      Should contain small letters
                    </FieldFeedback>
                    <FieldFeedback when={value => !/[A-Z]/.test(value)} warning>
                      Should contain capital letters
                    </FieldFeedback>
                  </FieldFeedbacks>
                  
              </div>
              <button
                type="submit"
                className="roundbutton2"
              >
                Register!
              </button>
            {/* </form> */}
            </FormWithConstraints>

      </div>
    )
  }
}

export default Register
