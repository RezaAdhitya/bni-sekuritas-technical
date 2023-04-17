import { deleteData, pushEditData } from "./fetchDataReducer";

const initialState = {
  isLoading: true,
  data: {},
  error: "",
};

export const deleteDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "task/deleteDataPending":
      return {
        ...initialState,
      };
    case "task/deleteDataSuccess":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "task/deleteDataReject":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteDataPending = () => ({
  type: "task/deleteDataPending",
});

export const deleteDataSuccess = (responseJson) => ({
  type: "task/deleteDataSuccess",
  payload: responseJson,
});

export const deleteDataReject = (error) => ({
  type: "task/deleteDataReject",
  payload: error,
});

//THUNK
export const doDeleteData = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(deleteDataPending())
      let res = await fetch('https://dummyjson.com/users/' + id,
        {
          method: 'DELETE',
        }
      )

      if (!res.ok) {
        throw await res.text();
      }

      let resJson = await res.json();
      dispatch(deleteDataSuccess(resJson))
      dispatch(deleteData({id: +id}));
    } catch (err) {
      dispatch(deleteDataReject(err));
      throw err;
    }
  };
};
