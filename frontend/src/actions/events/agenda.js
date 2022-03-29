import axios from 'axios';
import Config from '../../config';

const schedule = () => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'agenda', events: response.data.events });
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'snack',
      content: 'network error: could not load your agenda',
      severity: 'error',
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/events/list`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default schedule;
