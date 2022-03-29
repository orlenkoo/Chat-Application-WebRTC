import axios from 'axios';
import Config from '../../config';

const getType = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'type', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'type', data: null });
    const response = await axios.post(`${Config.url}/api/stats/type`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getType;
