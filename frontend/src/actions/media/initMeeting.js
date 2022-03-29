import axios from 'axios';
import * as mediasoupClient from 'mediasoup-client';
import Config from '../../config';
import store from '../../store';

/* eslint-disable */

const getRtpCapabilities = async ({ meetingId, dispatch }) => {
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

const join = async ({ meetingId, sessionId, dispatch }) => {
  const onSuccess = (response) => {
    dispatch({ type: 'join-meeting', ...response.data });
    return response.data;
  };

  const onError = (error) => {
    dispatch({ type: 'join-error' });
    dispatch({ type: 'snack', content: 'could not join meeting', severity: 'error' });
    return error ? error.response.data : error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/join`, { meetingId, sessionId });
    return onSuccess(response);
  } catch (error) {
    console.log(error ? error.response.data : error);
    onError(error);
  }
};

const createProducerTransport = async ({ meeting, router, meetingId, sessionId, dispatch }) => {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    dispatch({ type: 'join-error' });
    dispatch({ type: 'snack', content: 'could not create producer transport', severity: 'error' });
    console.log('createProducerTransport error', error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/create-producer-transport`, { routerId: router._id, sessionId });
    return onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

const createConsumerTransport = async ({ meeting, router, meetingId, sessionId, dispatch }) => {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    dispatch({ type: 'join-error' });
    dispatch({ type: 'snack', content: 'could not create producer transport', severity: 'error' });
    console.log('createConsumerTransport error', error);
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/create-consumer-transport`, { routerId: router._id, sessionId });
    return onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

const connectProducerTransport = async ({ router, sessionId, dtlsParameters, dispatch }) => {
  const onSuccess = async (response) => {
    return response;
  };

  const onError = (error) => {
    dispatch({ type: 'join-error' });
    dispatch({ type: 'snack', content: 'could not join meeting', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/connect-producer-transport`, { routerId: router._id, sessionId, dtlsParameters });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

const connectConsumerTransport = async ({ router, sessionId, dtlsParameters, dispatch }) => {
  const onSuccess = async (response) => {
    return response;
  };

  const onError = (error) => {
    dispatch({ type: 'join-error' });
    dispatch({ type: 'snack', content: 'could not join meeting', severity: 'error' });
    return error;
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/connect-consumer-transport`, { routerId: router._id, sessionId, dtlsParameters });
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

const produce = async ({ router, meeting, sessionId, rtpParameters, kind, isScreen, dispatch }) => {
  const onSuccess = async (response) => {
    return response.data;
  };

  const onError = (error) => {
    dispatch({ type: 'join-error' });
    dispatch({ type: 'snack', content: 'could not join meeting', severity: 'error' });
    console.log('produce error', error);
    return { error };
  };

  try {
    const response = await axios.post(`${Config.url}/api/media/produce`, {
      routerId: router._id, meetingId: meeting._id, sessionId, rtpParameters, kind, isScreen,
    });
    return onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

const initMeeting = ({ meeting }) => async (dispatch) => {
  const meetingId = meeting._id;
  const sessionId = (store.getState().auth.session || {})._id;
  const device = store.getState().media.device;

  await getRtpCapabilities({ meetingId, dispatch });
  const { router, producers } = await join({ meetingId, dispatch, sessionId });

  const data = await createProducerTransport({ meeting, router, meetingId, sessionId, dispatch });

  const producerTransport = device.createSendTransport(data);

  producerTransport.on('connect', async ({dtlsParameters}, callback, errback) => {
    try {
      await connectProducerTransport({ meeting, router, dtlsParameters, sessionId, dispatch });
      callback();
    } catch (e) {
      errback();
    }
  });

  producerTransport.on('produce', async ({kind, rtpParameters, appData}, callback, errback) => {
    try {
      const {id} = await produce({
        router,
        meeting,
        sessionId,
        kind,
        rtpParameters,
        isScreen: appData && appData.isScreen,
        dispatch,
      });
      callback({id});
    } catch (err) {
      errback(err);
    }
  });

  producerTransport.on('connectionstatechange', (state) => {
    switch (state) {
      case 'connecting':
        break;

      case 'connected':
        break;

      case 'failed':
        producerTransport.close();
        break;

      default:
        break;
    }
  });

  dispatch({ type: 'producer-transport', transport: producerTransport });

  const recvData = await createConsumerTransport({ meeting, router, meetingId, sessionId, dispatch });

  const consumerTransport = device.createRecvTransport(recvData);

  consumerTransport.on('connect', async ({dtlsParameters}, callback, errback) => {
    try {
      await connectConsumerTransport({ meeting, router, dtlsParameters, sessionId, dispatch });
      callback();
    } catch (e) {
      errback();
    }
  });

  consumerTransport.on('connectionstatechange', (state) => {
    switch (state) {
      case 'connecting':
        break;

      case 'connected':
        break;

      case 'failed':
        producerTransport.close();
        break;

      default:
        break;
    }
  });

  dispatch({ type: 'consumer-transport', transport: consumerTransport });

  for (let producer of producers) {
    dispatch({
      type: 'producer',
      data: producer,
      id: producer.producerID,
    });
  }
};

export default initMeeting;
