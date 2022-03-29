import axios from 'axios';
import Config from '../../config';

const stopProducer = ({
  meetingId, sessionId, routerId, producerId,
}) => async () => {
  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/stop-producer`, {
      meetingId, sessionId, routerId, producerId,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default stopProducer;
