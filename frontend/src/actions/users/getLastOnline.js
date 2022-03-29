import axios from 'axios';
import Config from '../../config';

const getLastOnline = ({ user }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'last-online', user, data: response.data.result });
    return response;
  };

  const onError = (error) => {
    setTimeout(() => {
      dispatch(getLastOnline({ user }));
    }, 10000);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/last-online`, { user });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getLastOnline;
