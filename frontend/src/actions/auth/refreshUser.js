import axios from 'axios';
import Config from '../../config';

const refreshUser = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'user', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/user`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default refreshUser;
