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
    modal: false,
    registerSuccess: false,
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
        this.toggle();
        console.log(res);
        if (res.data.created) this.setState({ registerSuccess: true });
        else this.setState({ registerSuccess: false });
      })
      .catch(err => console.error(err));
  }

  render() {
    const successHeader = <div>Succes!</div>
    const successMessage = (
      <div>
        <div className="mb-2">Account created!</div>
        <div>Please login.</div>
      </div>
    )
    const duplicateHeader = <div>Oh no. . .</div>
    const duplicateMessage = <div>A user with this email already exists.</div>
    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);

    return (
      <React.Fragment>
        <Form className="needs-validation" id="register-form" autoComplete="off">
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            {this.state.registerSuccess ? successHeader : duplicateHeader}
          </ModalHeader>
          <ModalBody>
            {this.state.registerSuccess ? successMessage : duplicateMessage}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.toggle}>Close</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default RegisterForm;