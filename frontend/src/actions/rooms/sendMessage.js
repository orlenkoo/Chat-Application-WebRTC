import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config';
import store from '../../store';

const sendMessage = ({
  room, content, type = 'text',
}) => async (dispatch) => {
  const id = uuidv4();
  const author = { ...store.getState().auth.user };
  author._id = author.id;

  const files = [...store.getState().room.upload];

  dispatch({ type: 'remove-attachments' });

  dispatch({
    type: 'send-message-loading',
    loading: true,
    message: {
      _id: id, content, type, files, sending: true, author,
    },
  });

  const onSuccess = (response) => {
    dispatch({ type: 'send-message', data: response.data, id });
    return response;
  };

  const onError = (error) => {
    dispatch({
      type: 'send-message-error',
      loading: false,
      message: {
        _id: id, content, type, files, sending: true, author,
      },
    });
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/messages/send`, {
      room, content, type, files,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({
    type: 'send-message-loading',
    loading: false,
    message: {
      _id: id, content, type, files, sending: true, author,
    },
  });
};

export default sendMessage;
