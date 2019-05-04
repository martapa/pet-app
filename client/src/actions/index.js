import axios from 'axios';

import { GET_DOGS, GET_DOGS_NEAR } from './types';

export function getDogs(){
  const request = axios.get('/pets');
  return function(dispatch) {
    request.then(function(response) {
      dispatch({
        type: GET_DOGS,
        payload: response.data.data[0]
      });
    });
  }
}

export function getDogsNearYou(lng, lat){
  const request = axios.get(`/shelters/near?lat=${lat}&lon=${lng}`);
  return function(dispatch) {
    request.then(function(response) {
      console.log(response)
      dispatch({
        type: GET_DOGS_NEAR,
        payload: response.data.data[0]
      })
    });
  }
}
