import { SET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  if (action.type === SET_USER) return {
    ...state,
    isAuthenticated: true,
    user: action.payload
  }
  return state;
}