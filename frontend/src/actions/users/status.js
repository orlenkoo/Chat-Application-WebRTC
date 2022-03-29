import axios from 'axios';
import Config from '../../config';

const status = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'status', data: response.data });
    return response;
  };

  const onError = (error) => {
    setTimeout(() => {
      dispatch(status());
    }, 10000);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/status`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default status;
