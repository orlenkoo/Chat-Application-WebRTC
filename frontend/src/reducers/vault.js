const initialState = {
  files: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'upload-loading':
      return {
        ...state,
        loading: action.loading,
      };
    case 'files':
      return {
        ...state,
        files: (action.data || {}).shields,
      };
    default:
      return state;
  }
};

export default reducer;
