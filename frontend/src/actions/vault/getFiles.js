import axios from 'axios';
import Config from '../../config';

const getFiles = (text = '') => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'files', data: response.data });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    dispatch({ type: 'files', data: null });
    const response = await axios.post(`${Config.url}/api/vault/search`, {
      name: text,
      originalName: text,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getFiles;
