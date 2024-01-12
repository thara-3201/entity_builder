import { combineReducers } from "redux";
import tableReducer from "./tableReducer";

const rootReducer = combineReducers({
  table: tableReducer,
  // Add other reducers here if needed
});

export default rootReducer;
