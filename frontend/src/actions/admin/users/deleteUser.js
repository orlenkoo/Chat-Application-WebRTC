import axios from 'axios';
import Config from '../../../config';

const deleteUser = ({ id, username }) => async (dispatch) => {
  if (!id || id.length === 0) {
    dispatch({
      type: 'snack',
      content: 'critical error id required - refresh the page, if it happens again contact support',
      severity: 'error',
    });
    return;
  }

  const onSuccess = (response) => {
    dispatch({ type: 'user-delete', id });
    dispatch({
      type: 'snack',
      content: `user ${username} deleted`,
      severity: 'success',
    });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/delete`, {
      id,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default deleteUser;
