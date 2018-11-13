import React, { Component } from 'react';
import { logout } from '../../../redux/actions/auth.actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
})

class Logout extends Component {
  logout() {
    console.log('hello');
    this.props.logout();
    window.location.href = '/';
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={this.logout.bind(this)}>Logout</button>
    );
  }
}

export default connect(mapStateToProps, { logout })(Logout);