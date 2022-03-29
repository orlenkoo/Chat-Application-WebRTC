import axios from 'axios';
import Config from '../../config';
import listMessages from './listMessages';

const getRoom = ({ room }) => async (dispatch) => {
  dispatch({ type: 'room-loading', loading: true });

  const onSuccess = (response) => {
    dispatch({ type: 'room', data: response.data });
    dispatch(listMessages({ room }));
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/rooms/room`, {
      room,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'room-loading', loading: false });
};

export default getRoom;
