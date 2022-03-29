import axios from 'axios';
import Config from '../../config';
import agenda from './agenda';

const schedule = ({ title, members, date }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({
      type: 'snack',
      content: 'meeting scheduled!',
      severity: 'success',
    });
    dispatch({ type: 'clear-create-meeting-form' });
    dispatch(agenda());
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'snack',
      content: 'network error: could not schedule meeting',
      severity: 'error',
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/events/add`, {
      type: 'meeting', title, members, date,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default schedule;
