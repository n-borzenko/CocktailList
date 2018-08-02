import { combineReducers } from "redux";
import * as menuReducers from "./menu";

export default combineReducers({ ...menuReducers });
