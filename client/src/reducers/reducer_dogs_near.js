import { GET_DOGS_NEAR } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_DOGS_NEAR:
    //console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
}
