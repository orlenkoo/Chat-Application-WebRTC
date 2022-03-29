import axios from 'axios';
import Config from '../../config';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const login = ({ email, navigate, actions }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({ type: 'forgot password email', email });
    navigate('/auth/code', { replace: true });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.email) actions.setFieldError('email', capitalizeFirstLetter(data.email));
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/code`, { email });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default login;
