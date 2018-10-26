import { ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  if (action.type === ERRORS) return action.payload;
  if (action.type === CLEAR_ERRORS) return {};
  return state;
}