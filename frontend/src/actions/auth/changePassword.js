import axios from 'axios';
import Config from '../../config';
import capitalizeFirstLetter from '../../utils/capitlizeFirstLetter';

const changePassword = ({
  email, password, code, navigate, actions
}) => async (dispatch) => {
  const onSuccess = (response) => {
    navigate('/auth/login', { replace: true });
    dispatch({ type: 'snack', content: 'password changed', severity: 'success' });
    return response;
  };

  const onError = (error) => {
    if (error.response) {
      const { data } = error.response;
      if (data.code) actions.setFieldError('code', capitalizeFirstLetter(data.code));
      if (data.password) actions.setFieldError('password', capitalizeFirstLetter(data.password));
    }
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/auth/change`, { email, password, code });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }

  actions.setSubmitting(false);
};

export default changePassword;
