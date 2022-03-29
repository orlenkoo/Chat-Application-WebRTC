import axios from 'axios';
import Config from '../../config';

const listRooms = () => async (dispatch) => {
  dispatch({ type: 'rooms-list-loading', loading: true });

  const onSuccess = (response) => {
    dispatch({ type: 'rooms-list', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/rooms/list`);
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'rooms-list-loading', loading: false });
};

export default listRooms;
