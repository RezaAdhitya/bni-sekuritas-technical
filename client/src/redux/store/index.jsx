import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";
import { fetchDataReducer } from "../reducers/fetchDataReducer";
import { addDataReducer } from "../reducers/AddDataReducer";
import thunk from "redux-thunk";
import { editDataReducer } from "../reducers/editDataReducer";
import { deleteDataReducer } from "../reducers/DeleteDataReducer";


const rootReducer = combineReducers({
  fetchData: fetchDataReducer,
  addData: addDataReducer,
  editData: editDataReducer,
  deleteData: deleteDataReducer

});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;