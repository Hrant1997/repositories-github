import { combineReducers } from 'redux';
import repositoryReducer from './repositories';

const rootReducer = combineReducers({
  repositories: repositoryReducer,
});

export default rootReducer;
