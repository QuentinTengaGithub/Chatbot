import { combineReducers } from "redux";
import botReducer from './Bot/botReducer';
// import genericReducer from './Generic/genericReducer';

const rootReducer = combineReducers({
  chat: botReducer,
  // generic: genericReducer,
});

export default rootReducer;
