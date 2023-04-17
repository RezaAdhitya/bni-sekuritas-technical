const initialState = {
  isLoading: true,
  data: [],
  error: "",
};

export const fetchDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "task/fetchDataPending":
      return {
        ...initialState,
      };
    case "task/fetchDataSuccess":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "task/fetchDataReject":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "task/pushAddData":
      const newData = state.data
      newData.push(action.payload)
      return {
        ...state,
        isLoading: false,
        data: newData
      };
    case "task/pushEditData":
      const editedData = state.data
      const index = editedData?.findIndex(el => el.id === action.payload.id)
      editedData.splice(index, 1, action.payload.data)
      return {
        ...state,
        isLoading: false,
        data: editedData
      };
    case "task/deleteData":
      const afterDelete = state.data
      const deleteIndex = afterDelete?.findIndex(el => el.id === action.payload.id)
      afterDelete.splice(deleteIndex, 1)
      return {
        ...state,
        isLoading: false,
        data: afterDelete
      }
    default:
      return state;
  }
};

export const fetchDataPending = () => ({
  type: "task/fetchDataPending",
});

export const fetchDataSuccess = (responseJson) => ({
  type: "task/fetchDataSuccess",
  payload: responseJson,
});

export const fetchDataReject = (error) => ({
  type: "task/fetchDataReject",
  payload: error,
});

export const pushAddData = (json) => ({
  type: "task/pushAddData",
  payload: json
})

export const pushEditData = (json) => ({
  type: "task/pushEditData",
  payload: json
})

export const deleteData = (json) => ({
  type: "task/deleteData",
  payload: json
})

//THUNK
export const doFetchData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchDataPending());
      let res = await fetch(
        'https://dummyjson.com/users'
      );
      if (!res.ok) {
        throw await res.text();
      }

      let resJson = await res.json();
      dispatch(fetchDataSuccess(resJson.users));
    } catch (err) {
      dispatch(fetchDataReject(err));
      throw err;
    }
  };
};
