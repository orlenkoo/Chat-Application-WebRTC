const initialState = {
  overall: null,
  traffic: null,
  data: null,
  disk: null,
  bandwidth: null,
  type: null,
  latest: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'overall':
      return {
        ...state,
        overall: action.data,
      };
    case 'traffic':
      return {
        ...state,
        traffic: action.data,
      };
    case 'data':
      return {
        ...state,
        data: action.data,
      };
    case 'disk':
      return {
        ...state,
        disk: action.data,
      };
    case 'bandwidth':
      return {
        ...state,
        bandwidth: action.data,
      };
    case 'type':
      return {
        ...state,
        type: action.data,
      };
    case 'latest':
      return {
        ...state,
        latest: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
