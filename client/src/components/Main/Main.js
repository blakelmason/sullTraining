import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Home from './Home/Home';
import Account from './Account/Account'

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Switch>
            <Route path="/account" component={Account} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;
