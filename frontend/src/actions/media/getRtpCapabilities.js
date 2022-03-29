import axios from 'axios';
import * as mediasoupClient from 'mediasoup-client';
import Config from '../../config';

const getRtpCapabilities = ({ meetingId }) => async (dispatch) => {
  const onSuccess = async (response) => {
    const { rtpCapabilities } = response.data;

    const capabilities = { routerRtpCapabilities: rtpCapabilities };

    let device;

    try {
      device = new mediasoupClient.Device();
    } catch (error) {
      console.warn(error);
      if (error.name === 'UnsupportedError') {
        dispatch({ type: 'snack', content: 'unsupported browser', severity: 'error' });
      }
    }

    await device.load(capabilities);

    window.device = device;

    let canVideo = false;
    let canAudio = false;

    if (device.canProduce('video')) {
      canVideo = true;
    }

    if (device.canProduce('audio')) {
      canAudio = true;
    }

    dispatch({
      type: 'media-init',
      rtpCapabilities: capabilities,
      canAudio,
      canVideo,
      device,
    });

    return response;
  };

  const onError = (error) => {
    dispatch({ type: 'media-error' });
    dispatch({ type: 'snack', content: 'cannot connect to meetings server', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/get-rtp-capabilities`, { meetingId });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default getRtpCapabilities;
