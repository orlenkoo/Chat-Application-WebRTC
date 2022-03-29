import axios from 'axios';
import Config from '../../config';

const getTraffic = (days) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'traffic', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'traffic', data: null });
    const response = await axios.post(`${Config.url}/api/stats/traffic`, { days });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getTraffic;
