import axios from 'axios';
import Config from '../../config';
import listMessages from './listMessages';
import listRooms from './listRooms';

const getConversation = ({ user, navigate }) => async (dispatch) => {
  dispatch({ type: 'room-loading', loading: true });

  const onSuccess = (response) => {
    dispatch({ type: 'room', data: response.data });
    dispatch(listMessages({ room: response.data.room._id }));
    dispatch(listRooms());
    if (response.data && response.data.room) {
      navigate(`/room/${response.data.room._id}`);
    }
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/rooms/conversation`, {
      user,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'room-loading', loading: false });
};

export default getConversation;
