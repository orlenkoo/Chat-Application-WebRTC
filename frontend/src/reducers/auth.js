import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

if (localStorage.getItem('app') !== 'Clover 3.x.x') {
  localStorage.clear();
  localStorage.setItem('app', 'Clover 3.x.x');
}

const token = localStorage.getItem('token');
if (token) setAuthToken(token);

const initialState = {
  token,
  user: token ? jwtDecode(token) : null,
  loading: false,
  email: null,
  socket: null,
  session: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: {
          ...(state.user || {}),
          ...action.data.user,
          name: `${action.data.user.firstName} ${action.data.user.lastName}`
        },
      };
    case 'socket session':
      return {
        ...state,
        socket: action.socket,
        session: action.session,
      };
    case 'loading':
      return {
        ...state,
        loading: action.loading,
      };
    case 'login':
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case 'logout':
      return {
        ...state,
        token: null,
        user: null,
      };
    case 'forgot password email':
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
};

export default reducer;
