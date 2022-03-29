import axios from 'axios';
import Config from '../../config';
import agenda from './agenda';

const remove = ({ id }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({
      type: 'snack',
      content: 'meeting deleted!',
      severity: 'success',
    });
    dispatch({ type: 'clear-create-meeting-form' });
    dispatch({ type: 'form-open', value: false });
    dispatch(agenda());
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'snack',
      content: 'network error: could not delete meeting',
      severity: 'error',
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/events/delete`, {
      id,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default remove;
