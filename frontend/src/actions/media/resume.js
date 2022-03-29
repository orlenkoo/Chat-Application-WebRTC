import axios from 'axios';
import Config from '../../config';

const resume = ({
  routerId, meetingId, sessionId, consumerId,
}) => async (dispatch) => {
  const onSuccess = async (response) => {
    return response.data;
  };

  const onError = (error) => {
    dispatch({ type: 'join-error' });
    dispatch({ type: 'snack', content: 'could not join meeting', severity: 'error' });
    console.log('produce error', error);
    return { error };
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/resume`, {
      routerId, meetingId, sessionId, consumerId,
    });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default resume;
