import React from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="border rounded p-3">
            <h1>Login</h1>
            <LoginForm />
          </div>
        </div>
        <div className="col">
          <div className="border rounded p-3">
            <h1>Register</h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login;