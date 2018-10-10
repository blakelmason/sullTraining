import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import Welcome from './components/Welcome';
import About from './components/About';
import Pricing from './components/Pricing';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu />
          <Route exact path="/" component={Welcome} />
          <Route exact path="/about" component={About} />
          <Route exact path="/pricing" component={Pricing} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
