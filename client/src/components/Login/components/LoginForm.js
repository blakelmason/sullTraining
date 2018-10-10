import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  FormFeedback
} from 'reactstrap';
import axios from 'axios';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  handler(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  validate(e) {
    e.preventDefault();
    const form = document.getElementById('login-form');
    const validated = form.checkValidity();
    form.classList.add('was-validated');
    if (validated === true) this.registerUser();
  }

  registerUser() {
    axios.post()
  }

  render() {
    this.handler = this.handler.bind(this);
    return (
      <Form className="needs-validation" id="login-form">
        <FormGroup>
          <Input type="email" placeholder="Email" name="email" onChange={this.handler} required />
          <FormFeedback>Please enter an email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input type="password" placeholder="Password" name="password" onChange={this.handler} required />
          <FormFeedback>Please enter a password.</FormFeedback>
        </FormGroup>
        <button onClick={this.validate.bind(this)} className="btn btn-primary mt-3">Register</button>
      </Form>
    )
  }
}

export default LoginForm;