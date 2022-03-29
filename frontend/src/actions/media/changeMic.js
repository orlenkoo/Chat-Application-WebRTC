import store from '../../store';
import stopProducer from './stopProducer';

const changeMic = (value) => async (dispatch) => {
  if (value) {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      dispatch({ type: 'media-change-mic', active: true, audio: { stream } });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'snack', content: 'cannot get microphone stream', severity: 'error' });
    }
  } else {
    const { micProducer } = store.getState().media;
    const sessionId = (store.getState().auth.session || {})._id;
    const routerId = (store.getState().media.router || {})._id;
    const meetingId = store.getState().media.meetingID;
    try {
      const tracks = store.getState().media.audio.stream.getAudioTracks();
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].stop();
      }
    } catch (e) {
      console.log(e);
      console.log('error while stopping audio');
    }
    if (micProducer) {
      dispatch(stopProducer({
        sessionId, meetingId, routerId, producerId: micProducer._id,
      }));
    }
    dispatch({ type: 'media-change-mic', active: false, audio: null });
  }
};

export default changeMic;
