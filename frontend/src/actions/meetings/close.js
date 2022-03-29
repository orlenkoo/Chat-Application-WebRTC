import axios from 'axios';
import Config from '../../config';

const close = ({
  meetingId, sessionId, routerId,
}) => async () => {
  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/close`, {
      meetingId, sessionId, routerId,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default close;
