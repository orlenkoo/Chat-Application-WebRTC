import axios from 'axios';
import Config from '../../config';

const answer = ({
  room, meeting,
}) => async (dispatch) => {
  dispatch({
    type: 'answer-outbound',
    room,
    meeting
  });

  const onSuccess = (response) => {
    dispatch({
      type: 'answer-outbound',
      room,
      meeting
    });
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'answer-outbound',
      room,
      meeting
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/meetings/answer`, {
      room: room ? room._id : null,
      meeting: meeting ? meeting._id : null,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default answer;
