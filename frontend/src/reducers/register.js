const initialState = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'register':
      return {
        ...state,
        username: action.username,
        email: action.email,
        password: action.password,
        repeatPassword: action.repeatPassword,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    default:
      return state;
  }
};

export default reducer;
