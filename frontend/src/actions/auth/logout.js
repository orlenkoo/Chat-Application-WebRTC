import setAuthToken from '../../utils/setAuthToken';

const logout = ({ navigate }) => (dispatch) => {
  dispatch({ type: 'logout' });
  setAuthToken(null);
  localStorage.removeItem('token');
  dispatch({ type: 'snack', content: 'logout successful', severity: 'success' });
  navigate('/auth/login', { replace: true });
};

export default logout;
