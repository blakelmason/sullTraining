import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import Home from './Home';

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Route exact path={`${this.props.match.url}`} component={Home} />
        </div>
      </Router>
    );
  }
}

export default Main;
