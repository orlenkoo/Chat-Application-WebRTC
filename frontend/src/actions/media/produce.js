import store from '../../store';
import changeMic from './changeMic';
import changeCamera from './changeCamera';

/* eslint-disable */

const produce = ({
  cameraProducer, micProducer, camera, mic, producerTransport,
}) => async (dispatch) => {
  const transport = producerTransport;
  const video = store.getState().media.video;
  const audio = store.getState().media.audio;

  console.log('produce', camera, mic);

  if (!camera && cameraProducer) {
    try {
      cameraProducer.close();
    } catch (e) {}
    dispatch({ type: 'video-producer', videoProducer: null });
  } else if (camera && !cameraProducer) {
    try {
      const track = video.stream.getVideoTracks()[0];
      const params = {track};
      const videoProducer = await transport.produce(params);
      dispatch({ type: 'video-producer', videoProducer });
    } catch (err) {
      console.log('getusermedia produce failed', err);
      dispatch(changeCamera(false));
    }
  }

  if (!mic && micProducer) {
    try {
      micProducer.close();
    } catch (e) {}
    dispatch({ type: 'audio-producer', audioProducer: null });
  } else if (mic && !micProducer) {
    try {
      const track = audio.stream.getAudioTracks()[0];
      const params = {track};
      const audioProducer = await transport.produce(params);
      dispatch({ type: 'audio-producer', audioProducer });
    } catch (err) {
      console.log('getusermedia produce failed', err);
      dispatch(changeMic(false));
    }
  }
};

export default produce;
