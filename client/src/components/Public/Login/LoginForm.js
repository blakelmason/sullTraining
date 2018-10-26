import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth.actions';
import {
  Form,
  FormGroup,
  Input,
  FormFeedback
} from 'reactstrap';


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
    if (validated === true) this.loginUser();
  }

  loginUser() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.login(user)
      .then(res => {
        const token = res.data.token
        localStorage.setItem('token', token)
        window.location.href = '/';
      })
      .catch(err => console.log(err.response));
  }

  render() {
    this.handler = this.handler.bind(this);
    return (
      <Form className="needs-validation" id="login-form">
        <FormGroup>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handler}
            required
          />
          <FormFeedback>Please enter an email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handler}
            required
          />
          <FormFeedback>Please enter a password.</FormFeedback>
        </FormGroup>
        <button onClick={this.validate.bind(this)} className="btn btn-primary mt-3">Login</button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps, { login })(LoginForm);