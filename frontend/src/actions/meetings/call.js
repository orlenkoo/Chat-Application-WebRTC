import axios from 'axios';
import Config from '../../config';

const call = ({
  room, video,
}) => async (dispatch) => {
  if (room.members.length < 2) {
    dispatch({
      type: 'snack',
      content: 'you are the only member of this group: there is no one to call!',
      severity: 'error',
    });
    return;
  }

  dispatch({
    type: 'call-outbound',
    room,
    video,
  });

  const onSuccess = (response) => {
    dispatch({
      type: 'call-outbound',
      room,
      video,
      meeting: response.data.meeting,
    });
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'call-outbound',
      room,
      video,
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/meetings/call`, {
      room: room._id, video,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default call;
