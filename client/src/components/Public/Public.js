import React, { Component } from 'react';
import Menu from './Menu/Menu';
import Welcome from './Welcome';
import About from './About';
import Pricing from './Pricing';
import Login from './Login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Public extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu url={this.props.match.url} />
          <Route exact path={`${this.props.match.url}`} component={Welcome} />
          <Route path={`${this.props.match.url}/about`} component={About} />
          <Route path={`${this.props.match.url}/pricing`} component={Pricing} />
          <Route path={`${this.props.match.url}/login`} component={Login} />
        </div>
      </Router>
    );
  }
}

export default Public;
