import { combineReducers } from "redux";
import entitiesReducer from "./entities.js";
import authReducer from "./auth.js";

export default combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
});
