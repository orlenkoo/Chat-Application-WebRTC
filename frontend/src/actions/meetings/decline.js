import axios from 'axios';
import Config from '../../config';

const decline = ({
  room, meeting,
}) => async (dispatch) => {
  dispatch({
    type: 'decline-outbound',
    room,
    meeting
  });

  const onSuccess = (response) => {
    dispatch({
      type: 'decline-outbound',
      room,
      meeting
    });
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'decline-outbound',
      room,
      meeting
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/meetings/decline`, {
      room: room ? room._id : null,
      meeting: meeting ? meeting._id : null,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default decline;
