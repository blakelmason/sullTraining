import React, { Component } from 'react';
import {
  Navbar,
  // Collapse,
  NavbarBrand,
  // NavbarToggler,
  Nav,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { FaUserCircle, FaHome } from 'react-icons/fa';
import { logout } from '../../../redux/actions/auth.actions';
import { connect } from 'react-redux';

import PageLink from './PageLink';

class Menu extends Component {
  state = {
    isOpen: false
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

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
    // const titleStyle = {
    //   pointerEvents: 'none',
    //   zIndex: '1049',
    //   marginTop: '2px'
    // }

    const homeIcon = (<FaHome size="1.7em" className="mx-2" />);
    const userIcon = (<FaUserCircle size="1.7em" className="mx-2" />);

    return (
      <React.Fragment>
        {/* <div className="position-absolute text-center w-100 h2" style={titleStyle}>sullTraining</div> */}
        <div className="mb-3 border-bottom">
          <div className="container">
            <div className="row">
              <div className="col border-left border-right">
                <Navbar light expand="lg" className="p-0">
                  <NavbarBrand href="/" >
                    <img src={logo} alt="logo" style={logoStyle} />
                  </NavbarBrand>
                  {/* <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar> */}
                  <Nav className="ml-auto flex-row align-items-center" navbar>
                    {/* <PageLink to="/" icon={homeIcon} /> */}
                    <PageLink to="/" icon={userIcon} />
                    <li className="nav-item">
                      <button className="btn btn-primary btn-sm">
                        <Link className="nav-link p-0 text-light" to="" onClick={this.logout.bind(this)}>Logout</Link>
                      </button>
                    </li>
                  </Nav>
                  {/* </Collapse> */}
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