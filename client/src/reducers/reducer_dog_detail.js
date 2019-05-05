import { GET_DOG_DETAIL } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_DOG_DETAIL:
      return action.payload;
    default:
      return state;
  }
}
