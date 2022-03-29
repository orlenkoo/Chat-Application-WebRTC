import axios from 'axios';
import Config from '../../config';

const getDisk = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'disk', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'disk', data: null });
    const response = await axios.post(`${Config.url}/api/stats/disk`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getDisk;
