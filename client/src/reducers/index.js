import { combineReducers } from 'redux';
import dogs from './reducer_dogs';
import dogs_near_you from './reducer_dogs_near'
import dog_detail from './reducer_dog_detail'

const rootReducer = combineReducers({
  dogs,
  dogs_near_you,
  dog_detail
});

export default rootReducer;
