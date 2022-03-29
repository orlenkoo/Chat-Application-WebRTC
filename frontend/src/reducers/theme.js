import config from '../config';

const initialState = {
  dark: config.preferDark,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set dark mode':
      return {
        ...state,
        dark: action.dark,
      };
    default:
      return state;
  }
};

export default reducer;
