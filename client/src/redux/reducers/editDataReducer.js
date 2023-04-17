import { pushEditData } from "./fetchDataReducer";

const initialState = {
  isLoading: true,
  data: {},
  error: "",
};

export const editDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "task/editDataPending":
      return {
        ...initialState,
      };
    case "task/editDataSuccess":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "task/editDataReject":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editDataPending = () => ({
  type: "task/editDataPending",
});

export const editDataSuccess = (responseJson) => ({
  type: "task/editDataSuccess",
  payload: responseJson,
});

export const editDataReject = (error) => ({
  type: "task/editDataReject",
  payload: error,
});

//THUNK
export const doEditData = (formData, id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(editDataPending())
      formData.id = +id
      dispatch(pushEditData({id: +id, data: formData}));
    } catch (err) {
      dispatch(editDataReject(err));
      throw err;
    }
  };
};
