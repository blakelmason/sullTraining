import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import logo from '../../assets/images/logo.png';

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

  render() {
    this.toggle = this.toggle.bind(this);
    const titleStyle = {
      pointerEvents: 'none',
      zIndex: '1049',
      marginTop: '5px'
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
                    <img src={logo} alt="logo" className="logo" />
                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <PageLink to="/" text="Home" />
                      <PageLink to="/account" text="Account" />
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