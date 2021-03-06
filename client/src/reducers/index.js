import { combineReducers } from 'redux';
import dogs from './reducer_dogs';
import dogs_near_you from './reducer_dogs_near';
import dog_detail from './reducer_dog_detail';
import shelter_user from './reducer_get_shelter_user';
import my_dogs from './reducer_get_my_dogs';

const appReducer = combineReducers({
  dogs,
  dogs_near_you,
  dog_detail,
  shelter_user,
  my_dogs
});

const rootReducer = (state, action) => {
  if (action.type === 'user_logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
