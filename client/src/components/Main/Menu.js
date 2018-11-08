import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import logo from '../../assets/images/logo.png';
import { logout } from '../../redux/actions/auth.actions';
import { connect } from 'react-redux';

import PageLink from '../common/PageLink';

class Menu extends Component {
  state = {
    isOpen: false
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  home() { window.location.href = '/'; }

  logout() {
    console.log('hello');
    this.props.logout();
    window.location.href = '/';
  }

  render() {
    this.toggle = this.toggle.bind(this);
    const logoStyle = {
      height: '35px',
      width: '35px'
    }
    const titleStyle = {
      pointerEvents: 'none',
      zIndex: '1049',
      marginTop: '2px'
    }

    return (
      <React.Fragment>
        <div className="position-absolute text-center w-100 h2" style={titleStyle}>sullTraining</div>
        <div className="mb-3 border-bottom">
          <div className="container">
            <div className="row">
              <div className="col border-left border-right">
                <Navbar light expand="lg" className="p-0">
                  <NavbarBrand href="/" >
                    <img src={logo} alt="logo" style={logoStyle} />
                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <PageLink to="/" text="Home" onClick={this.home.bind(this)} />
                      <PageLink to="/account" text="Account" />
                      <PageLink to="" text="Logout" onClick={this.logout.bind(this)} />
                    </Nav>
                  </Collapse>
                </Navbar>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Menu);