import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config';
import changePicture from '../users/changePicture';

const uploadFile = (file, { action }) => async (dispatch) => {
  const id = uuidv4();

  dispatch({ type: 'upload-loading', loading: true, id });

  dispatch({
    type: 'snack',
    content: 'uploading file',
    severity: 'info',
  });

  const onSuccess = (response) => {
    console.log(response.data);

    switch (action) {
      case 'create-group-picture':
        dispatch({ type: 'create-group-picture', shield: response.data.shield.shield });
        break;
      case 'change-picture':
        dispatch(changePicture({ shield: response.data.shield.shield }));
        break;
      case 'attach-to-message':
      default:
        dispatch({
          type: 'snack',
          content: 'attachment added',
          severity: 'success',
        });
        dispatch({ type: 'attach-to-message', shield: response.data.shield._id });
        break;
    }

    return response;
  };

  const onError = (error) => {
    dispatch({ type: 'upload-error', id });
    console.log(error);
    return error;
  };

  try {
    const data = new FormData();

    data.append('file', file, file.name);

    const response = await axios.post(`${Config.url}/api/vault/upload`, data);

    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'upload-loading', loading: false, id });
};

export default uploadFile;
