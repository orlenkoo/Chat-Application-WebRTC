import axios from 'axios';
import Config from '../../config';

const listMessages = ({ room }) => async (dispatch) => {
  dispatch({ type: 'messages-list-loading', loading: true });

  const onSuccess = (response) => {
    dispatch({ type: 'messages-list', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/messages/list`, { room });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'messages-list-loading', loading: false });
};

export default listMessages;
