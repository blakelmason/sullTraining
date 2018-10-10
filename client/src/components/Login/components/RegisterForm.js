import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import axios from 'axios';

class RegisterForm extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  }

  handler(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  validate(e) {
    e.preventDefault();
    const form = document.getElementById('register-form');
    const validated = form.checkValidity();
    form.classList.add('was-validated');
    if (validated === true) this.registerUser();
  }

  registerUser() {
    axios.post('/auth/register', this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.error(err));
  }

  render() {
    this.handler = this.handler.bind(this);
    return (
      <React.Fragment>
        <Form className="needs-validation" id="register-form">
          <FormGroup>
            <Input type="text" placeholder="First Name" name="firstName" onChange={this.handler} required />
            <FormFeedback>Please enter a first name.</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input type="text" placeholder="Last Name" name="lastName" onChange={this.handler} required />
            <FormFeedback>Please enter a last name.</FormFeedback>
          </FormGroup>
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <button color="primary" onClick={this.toggle}>Do Something</button>{' '}
            <button color="secondary" onClick={this.toggle}>Cancel</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default RegisterForm;