import { createStore, applyMiddleware, compose  } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducer/index";

// const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)

const store = createStore(rootReducer, undefined)

export default store;


