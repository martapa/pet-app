import { GET_DOGS_NEAR } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_DOGS_NEAR:
      return action.payload;
    default:
      return state;
  }
}
