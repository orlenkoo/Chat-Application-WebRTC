import axios from 'axios';
import Config from '../../config';

const getMeeting = ({ meetingID }) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({
      type: 'meeting-details',
      meeting: response.data.meeting,
    });
    return response;
  };

  const onError = (error) => {
    console.log(error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/meetings/get`, {
      meetingID,
    });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getMeeting;
