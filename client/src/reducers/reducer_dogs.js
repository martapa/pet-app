import { GET_DOGS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_DOGS:
      return action.payload;
    default:
      return state;
  }
}
