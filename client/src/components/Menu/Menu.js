import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import logo from '../../assets/images/logo.png';
import PageLink from './components/PageLink';

class Menu extends Component {
  state = {
    isOpen: false
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    this.toggle = this.toggle.bind(this);
    const logoStyle = {
      height: '35px',
      width: '35px'
    }
    const titleStyle = {
      pointerEvents: 'none',
      zIndex: '10000',
      marginTop: '2px'
    }

    return (
      <React.Fragment>
        <div className="position-absolute text-center w-100 h2" style={titleStyle}>sullTraining</div>
        <div className="mb-3 border-bottom">
          <div className="container">
            <div className="row">
              <div className="col">
                <Navbar light expand="lg" className="p-0">
                  <NavbarBrand href="/" >
                    <img src={logo} alt="logo" style={logoStyle} />
                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <PageLink to="/" text="Home" />
                      <PageLink to="/about" text="About" />
                      <PageLink to="/pricing" text="Pricing" />
                      <PageLink to="/login" text="Login" />
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

export default Menu;