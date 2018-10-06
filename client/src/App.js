import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu />
          <Welcome />
          <div className="nav-item" style={{ width: '500px' }}>Hello</div>
        </div>
      </Router>
    );
  }
}

export default App;
