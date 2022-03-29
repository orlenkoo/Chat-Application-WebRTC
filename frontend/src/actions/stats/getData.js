import axios from 'axios';
import Config from '../../config';

const getData = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'data', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'data', data: null });
    const response = await axios.post(`${Config.url}/api/stats/data`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getData;
