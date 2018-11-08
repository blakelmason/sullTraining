import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import NoMatch from './components/common/NoMatch';
import { getUser } from './redux/actions/auth.actions';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setToken } from './utils/auth.utils';

import Public from './components/Public/Public';
import Main from './components/Main/Main';
import Loading from './components/common/Loading';

class App extends Component {
  state = { loading: true }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) this.checkExpired(token);
    else this.setState({ loading: false });
  }

  async checkExpired(token) {
    await this.wait();
    const currentTime = Date.now() / 1000;
    const decoded = jwt_decode(localStorage.token);
    if (decoded.exp < currentTime) return setToken(false);
    setToken(token);
    await this.props.getUser(token);
    this.setState({ loading: false });
  }

  async wait() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {
            this.state.loading ?
              <Loading />
              :
              <Switch>
                <PrivateRoute exact path="/" component={Main} />
                <PublicRoute path="/public" component={Public} />
                <Route component={NoMatch} />
              </Switch>
          }
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
})

export default connect(mapStateToProps, { getUser })(App);
