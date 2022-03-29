import axios from 'axios';
import Config from '../../config';

const changePassword = ({ password, repeatPassword }) => async (dispatch) => {
  if (!password || password.length === 0) {
    dispatch({
      type: 'snack',
      content: 'password required',
      severity: 'error',
    });
    return;
  }

  if (password.length < 6) {
    dispatch({
      type: 'snack',
      content: 'password must be at least 6 characters',
      severity: 'error',
    });
    return;
  }

  if (password !== repeatPassword) {
    dispatch({
      type: 'snack',
      content: 'passwords not matching',
      severity: 'error',
    });
    return;
  }

  const onSuccess = (response) => {
    dispatch({ type: 'user', data: response.data });
    dispatch({
      type: 'snack',
      content: 'password changed',
      severity: 'success',
    });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/change-password`, {
      password,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default changePassword;
