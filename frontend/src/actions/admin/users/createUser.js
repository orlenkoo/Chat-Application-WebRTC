import axios from 'axios';
import Config from '../../../config';

const createUser = ({
  firstName, lastName, username, email, password, setOpen, tenant,
}) => async (dispatch) => {
  const onSuccess = (response) => {
    const { user } = response.data;
    dispatch({ type: 'user-create', user: { ...user, fullName: `${user.firstName} ${user.lastName}` } });
    dispatch({
      type: 'snack',
      content: `user ${username} created`,
      severity: 'success',
    });
    setOpen(false);
    return response;
  };

  const onError = (error) => {
    console.log(error);
    if (!error.response || !error.response.data) {
      dispatch({
        type: 'snack',
        content: 'network error',
        severity: 'error',
      });
      return error;
    }
    const { data } = error.response;
    dispatch({
      type: 'snack',
      content: data.firstName || data.lastName || data.username || data.email || data.password,
      severity: 'error',
    });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/create`, {
      firstName, lastName, username, email, password, tenant,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default createUser;
