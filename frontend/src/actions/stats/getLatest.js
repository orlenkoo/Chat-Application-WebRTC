import axios from 'axios';
import Config from '../../config';

const getLatest = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'latest', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'latest', data: null });
    const response = await axios.post(`${Config.url}/api/stats/latest`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getLatest;
