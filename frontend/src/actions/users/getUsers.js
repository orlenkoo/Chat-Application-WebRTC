import axios from 'axios';
import Config from '../../config';
import store from '../../store';

const getUsers = ({ text = '', limit = 4 }) => async (dispatch) => {
  dispatch({ type: 'users-loading', loading: true });

  const onSuccess = (response) => {
    const users = (response.data.users || []).filter((e) => e.id !== store.getState().auth.user.id);
    dispatch({ type: 'users', data: { users } });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/users/search`, {
      text,
      limit,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  dispatch({ type: 'users-loading', loading: false });
};

export default getUsers;
