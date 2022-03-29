import axios from 'axios';
import Config from '../../config';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const register = ({
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
    dispatch({
      type: 'register', username, email, firstName, lastName, password, repeatPassword,
    });
    dispatch({ type: 'snack', content: 'verification email sent', severity: 'success' });
    navigate('/auth/verify');
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
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
    const response = await axios.post(`${Config.url}/api/auth/verify`, {
      username,
      email,
      firstName,
      lastName,
      password,
      repeatPassword,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default register;
