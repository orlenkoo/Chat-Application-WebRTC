import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Config from '../../config';
import setAuthToken from '../../utils/setAuthToken';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const login = ({
  username, password, navigate, actions
}) => async (dispatch) => {
  const onSuccess = (response) => {
    const { token } = response.data;
    dispatch({ type: 'login', token, user: jwtDecode(token) });
    setAuthToken(token);
    localStorage.setItem('token', token);
    dispatch({ type: 'snack', content: 'login successful', severity: 'success' });
    navigate('/welcome', { replace: true });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.username) actions.setFieldError('username', capitalizeFirstLetter(data.username));
      if (data.password) actions.setFieldError('password', capitalizeFirstLetter(data.password));
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/login`, { username, password });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default login;
