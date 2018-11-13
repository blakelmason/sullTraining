import React from 'react';

import Logout from './Logout';

const Account = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Account</h1>
            <div><Logout /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;