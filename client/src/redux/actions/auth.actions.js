import axios from 'axios';
import { setToken } from '../../utils/auth.utils';

import { ERRORS, SET_USER } from "./types";

export const register = (user) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post('/auth/register', user)
      .then(res => resolve(res))
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err
        })
        reject(err);
      });
  })
}

export const login = (user) => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get('/auth/login', { params: user })
      .then(res => resolve(res))
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err
        })
        reject(err);
      });
  })
}

export const getUser = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get('/api/user')
      .then(res => {
        dispatch(setUser(res.data))
        resolve(res);
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err
        })
        reject(err);
      });
  })
}

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const logout = () => dispatch => {
  console.log('hello2');
  localStorage.removeItem('token');
  setToken(false);
  dispatch(setUser({}));
};