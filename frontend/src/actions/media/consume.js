import axios from 'axios';
import Config from '../../config';
import store from '../../store';
import resume from './resume';

/* eslint-disable */

const consumeRequest = async ({ router, meeting, sessionId, rtpCapabilities, kind, isScreen, dispatch, producerId }) => {
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
    const response = await axios.post(`${Config.url}/api/media/consume`, {
      routerId: router._id, meetingId: meeting._id, sessionId, rtpCapabilities, kind, isScreen, producerId,
    });
    return onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

const consume = ({
  consumerTransport, producers,
}) => async (dispatch) => {
  const transport = consumerTransport;
  const video = store.getState().media.video;
  const audio = store.getState().media.audio;
  const sessionId = (store.getState().auth.session || {})._id;
  const meeting = store.getState().media.meeting;
  const router = store.getState().media.router;
  const device = window.device;

  const {rtpCapabilities} = device;

  for (let key of Object.keys(producers)) {
    const producer = producers[key];

    if (!producer.stream) {
      const data = await consumeRequest({
        router,
        meeting,
        sessionId,
        kind: producer.kind,
        rtpCapabilities,
        producerId: producer.producerID,
        dispatch,
      });

      if (!data) return;

      const {
        producerId,
        id,
        kind,
        rtpParameters,
      } = data;

      let codecOptions = {};
      const consumer = await transport.consume({
        id,
        producerId,
        kind,
        rtpParameters,
        codecOptions,
      });
      consumer.on("producerclose", () => {
        console.log("associated producer closed so consumer closed");
      });
      consumer.on("close", () => {
        console.log("consumer closed");
      });
      const stream = new MediaStream();
      stream.addTrack(consumer.track);
      stream.isVideo = kind === 'video';

      dispatch({ type: 'stream', producer, stream: { media: stream } });

      console.log('consume producer', producer);

      dispatch(resume({
        consumerId: consumer.id,
        routerId: router._id,
        meetingId: meeting._id,
        sessionId,
      }));

      console.log('resume consumer', producer);
    }
  }
};

export default consume;
