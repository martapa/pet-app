import { combineReducers } from 'redux';
import dogs from './reducer_dogs.js';
import dogs_near_you from './reducer_dogs_near'

const rootReducer = combineReducers({
  dogs,
  dogs_near_you
});

export default rootReducer;
