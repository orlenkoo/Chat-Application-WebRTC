import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Config from '../../config';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';
import setAuthToken from '../../utils/setAuthToken';

const register = ({
  code,
  username,
  email,
  firstName,
  lastName,
  password,
  repeatPassword,
  navigate,
  actions,
}) => async (dispatch) => {
  const onSuccess = (response) => {
    const { token } = response.data;
    dispatch({ type: 'login', token, user: jwtDecode(token) });
    setAuthToken(token);
    localStorage.setItem('token', token);
    dispatch({ type: 'snack', content: 'sign up successful', severity: 'success' });
    navigate('/welcome', { replace: true });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.code) actions.setFieldError('code', capitalizeFirstLetter(data.code));
      if (data.username) actions.setFieldError('username', capitalizeFirstLetter(data.username));
      if (data.email) actions.setFieldError('email', capitalizeFirstLetter(data.email));
      if (data.firstName) actions.setFieldError('firstName', capitalizeFirstLetter(data.firstName));
      if (data.lastName) actions.setFieldError('lastName', capitalizeFirstLetter(data.lastName));
      if (data.password) actions.setFieldError('password', capitalizeFirstLetter(data.password));
      if (data.repeatPassword) actions.setFieldError('repeatPassword', capitalizeFirstLetter(data.repeatPassword));
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/register`, {
      username,
      email,
      firstName,
      lastName,
      password,
      repeatPassword,
      code,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default register;
