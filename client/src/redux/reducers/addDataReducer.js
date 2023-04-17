import { pushAddData } from "./fetchDataReducer";
import Swal from 'sweetalert2'
const initialState = {
  isLoading: true,
  data: {},
  error: "",
};

export const addDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "task/addDataPending":
      return {
        ...initialState,
      };
    case "task/addDataSuccess":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "task/addDataReject":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addDataPending = () => ({
  type: "task/addDataPending",
});

export const addDataSuccess = (responseJson) => ({
  type: "task/addDataSuccess",
  payload: responseJson,
});

export const addDataReject = (error) => ({
  type: "task/addDataReject",
  payload: error,
});

//THUNK
export const doAddData = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addDataPending());
      let res = await fetch('https://dummyjson.com/users/add',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      )

      if (!res.ok) {
        throw await res.text();
      }

      let resJson = await res.json();

      dispatch(pushAddData(resJson));
    } catch (err) {
      dispatch(addDataReject(err));
      throw err;
    }
  };
};
