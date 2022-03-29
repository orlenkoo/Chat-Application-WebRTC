import axios from 'axios';
import Config from '../../config';

const changePicture = ({ firstName, lastName }) => async (dispatch) => {
  if (!firstName || firstName.length === 0) {
    dispatch({
      type: 'snack',
      content: 'first name required',
      severity: 'error',
    });
    return;
  }

  if (!lastName || lastName.length === 0) {
    dispatch({
      type: 'snack',
      content: 'last name required',
      severity: 'error',
    });
    return;
  }

  const onSuccess = (response) => {
    dispatch({ type: 'user', data: response.data });
    dispatch({
      type: 'snack',
      content: 'user details saved',
      severity: 'success',
    });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/change-name`, {
      firstName, lastName,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default changePicture;
