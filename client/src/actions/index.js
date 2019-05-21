import axios from 'axios';

import {
  GET_DOGS,
  GET_DOGS_NEAR,
  GET_DOG_DETAIL,
  GET_SHELTER_USER,
  GET_MY_DOGS,

} from './types';
import { getToken } from '../services/tokenService';

export function getDogs() {
  const request = axios.get('/pets');
  return function(dispatch) {
    request.then(function(response) {
      dispatch({
        type: GET_DOGS,
        payload: response.data.data[0]
      });
    });
  };
}

export function getDogsNearYou(lng, lat) {
  const request = axios.get(`/shelters/near?lat=${lat}&lon=${lng}`);
  return function(dispatch) {
    request.then(function(response) {
      //console.log(response);
      dispatch({
        type: GET_DOGS_NEAR,
        payload: response.data.data[0]
      });
    });
  };
}

export function getDogDetail(id) {
  const request = axios.get(`/pets/${id}`);
  return function(dispatch) {
    request.then(function(response) {
      //console.log("response", response)
      dispatch({
        type: GET_DOG_DETAIL,
        payload: response.data.data[0][0]
      });
    });
  };
}

export function getMyDogs() {
  const token = getToken();

  const req = axios.get(
    '/shelters/mypets',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return function(dispatch) {
    req.then(function(response) {
      console.log("response",response);
      dispatch({
        type: GET_MY_DOGS,
        payload: response.data.data[0].pets_profiles
      });
    });
  };
}

export function getShelterUser() {
  const token = getToken();

  const req = axios.post(
    '/shelters',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return function(dispatch) {
    req.then(function(response) {
      dispatch({
        type: GET_SHELTER_USER,
        payload: response.data.data[0]
      });
    });
  };
}


export function deleteDog(id) {
  const token = getToken();

  const req = axios.delete(
    `/pets/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return function(dispatch) {
    req.then(function(response) {
      console.log('response delete',response);
      dispatch({
        type: GET_MY_DOGS,
        payload: response.data.data[0][0].pets_profiles
      });
    });
  };
}


// export function addDog(dog) {
//   const token = getToken();
//   const req = axios.post(
//     '/pets',
//     dog,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );
//
//   return function(dispatch) {
//     req.then(function(response) {
//       console.log('response delete',response);
//       dispatch({
//         type: GET_MY_DOGS,
//         payload: response.data.data[0][0].pets_profiles
//       });
//     });
//   };
// }
