import axios from 'axios';
import Config from '../../config';

const getBandwidth = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'bandwidth', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'bandwidth', data: null });
    const response = await axios.post(`${Config.url}/api/stats/bandwidth`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getBandwidth;
