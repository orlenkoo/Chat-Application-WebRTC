import axios from 'axios';
import Config from '../../../config';

const editUser = ({
  id, firstName, lastName, username, email, password, setOpen, popupUsername, tenant,
}) => async (dispatch) => {
  const onSuccess = (response) => {
    const { result } = response.data;
    dispatch({ type: 'user-edit', user: { ...result, fullName: `${result.firstName} ${result.lastName}` } });
    dispatch({
      type: 'snack',
      content: `user ${popupUsername} edited`,
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
    const response = await axios.post(`${Config.url}/api/users/edit`, {
      id, firstName, lastName, username, email, password, tenant,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default editUser;
