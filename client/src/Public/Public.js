import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import Welcome from './components/Welcome';
import About from './components/About';
import Pricing from './components/Pricing';
import Login from './components/Login/Login';
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
