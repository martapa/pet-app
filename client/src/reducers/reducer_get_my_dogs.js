import { GET_MY_DOGS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_MY_DOGS:
    //console.log("reducer",action.payload)

      return action.payload;
    default:
      return state;
  }
}
