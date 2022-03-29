import axios from 'axios';
import Config from '../../config';

const cancel = ({
  room, meeting,
}) => async (dispatch) => {
  dispatch({
    type: 'cancel-outbound',
    room,
    meeting
  });

  const onSuccess = (response) => {
    dispatch({
      type: 'cancel-outbound',
      room,
      meeting
    });
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'cancel-outbound',
      room,
      meeting
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/meetings/cancel`, {
      room: room ? room._id : null,
      meeting: meeting ? meeting._id : null,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default cancel;
