import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg">
          <div className="border rounded p-3 my-3">
            <h1>Login</h1>
            <LoginForm />
          </div>
        </div>
        <div className="col-12 col-lg">
          <div className="border rounded p-3 my-3">
            <h1>Register</h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login;