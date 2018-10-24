import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';

import Public from './Public/Public';
import Main from './Main/Main';

class App extends Component {

  componentDidMount() {
    this.checkToken();
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      axios.get('/api/user', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          this.setState({ loggedIn: true })
        })
        .catch(err => {
          console.error(err);
          console.log(err.response)
        });
    }
  }

  render() {
    const loggedIn = false;
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" render={() => (loggedIn ? <Main /> : (<Redirect to="/public" />))} />
            <Route exact path="/public" component={Public} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
