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
    passwordInvalid: null,
    passwordFeedback: 'Please enter a password.',
    emailInvalid: null,
    emailFeedback: 'Please enter an email.',
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
      .catch(err => {
        console.log(err.response);
        const status = err.response.status;
        const form = document.getElementById('login-form');
        form.classList.remove('was-validated');
        if (status === 401) {
          this.setState({
            passwordInvalid: true,
            passwordFeedback: 'Wrong password.'
          })
        }
        if (status === 500) {
          if (err.response.data.error === 'User does not exist.') {
            this.setState({
              emailInvalid: true,
              emailFeedback: 'User does not exist. Please register before logging in.'
            })
          } else if (err.response.data.error === 'Password check error.') {
            this.setState({
              passwordInvalid: true,
              passwordFeedback: 'Wrong password.'
            })
          }
        }
      });
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
            invalid={this.state.emailInvalid}
          />
          <FormFeedback>{this.state.emailFeedback}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handler}
            required
            invalid={this.state.passwordInvalid}
          />
          <FormFeedback>{this.state.passwordFeedback}</FormFeedback>
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