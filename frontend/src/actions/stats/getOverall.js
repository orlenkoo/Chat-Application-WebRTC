import axios from 'axios';
import Config from '../../config';

const getOverall = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'overall', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'overall', data: null });
    const response = await axios.post(`${Config.url}/api/stats/overall`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getOverall;
