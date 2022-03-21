import { combineReducers } from "redux";
import entitiesReducer from "./entities.js";
import authReducer from "./auth.js";
import navigationReducer from "./navigation.js";
import entityreducer from "./entity.js";

export default combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  navigation: navigationReducer,
  entity: entityreducer,
});
