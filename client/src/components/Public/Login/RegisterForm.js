import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../redux/actions/auth.actions';
import {
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

class RegisterForm extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password1: '',
    password2: '',
    modal: false,
    registerSuccess: false,
  }

  reload() { window.location.reload(); }

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
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password1,
    }

    this.props.register(user)
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

    const p1 = this.state.password1;
    let passwordMessage;
    if (p1.length === 0) passwordMessage = 'Please enter a password.'
    if (p1.length < 8) passwordMessage = 'Password must be at least 8 characters.'

    const p2 = this.state.password2
    let confirmMessage;
    if (p2 !== p1) confirmMessage = 'Passwords must match.'
    if (p2.length < 8 && p1.length < 8) confirmMessage = 'Password must be at least 8 characters.'
    if (p2.length === 0) confirmMessage = 'Please confirm your password.'

    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);

    return (
      <React.Fragment>
        <Form className="needs-validation" id="register-form">
          <FormGroup>
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={this.handler}
              maxLength="128"
              required
            />
            <FormFeedback>
              Please enter a first name.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={this.handler}
              maxLength="128"
              required
            />
            <FormFeedback>
              Please enter a last name.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handler}
              maxLength="128"
              required
            />
            <FormFeedback>
              Please enter an email.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              name="password1"
              onChange={this.handler}
              minLength="8"
              maxLength="128"
              required
            />
            <FormFeedback>
              {passwordMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              onChange={this.handler}
              pattern={this.state.password1}
              minLength="8"
              maxLength="128"
              required
            />
            <FormFeedback>
              {confirmMessage}
            </FormFeedback>
          </FormGroup>
          <button onClick={this.validate.bind(this)} className="btn btn-primary mt-3" >
            Register
          </button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          onClosed={this.state.registerSuccess ? this.reload.bind(this) : () => { }}
          centered
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.registerSuccess ? successHeader : duplicateHeader}
          </ModalHeader>
          <ModalBody>
            {this.state.registerSuccess ? successMessage : duplicateMessage}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.toggle}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps, { register })(RegisterForm);