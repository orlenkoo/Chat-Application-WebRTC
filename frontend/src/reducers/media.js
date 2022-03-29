const initialState = {
  init: false,
  error: false,
  rtpCapabilities: null,
  mic: false,
  camera: false,
  canAudio: false,
  canVideo: false,
  video: null,
  audio: null,
  room: null,
  meeting: null,
  direction: 'outgoing',
  dialog: false,
  meetingID: null,
  router: null,
  device: null,
  producerTransport: null,
  consumerTransport: null,
  cameraProducer: null,
  micProducer: null,
  producers: {},
};

const reducer = (state = initialState, action) => {
  const producers = { ...state.producers };
  switch (action.type) {
    case 'stream':
      return {
        ...state,
        producers: {
          ...state.producers,
          [action.producer.producerID]: {
            ...action.producer, stream: action.stream,
          },
        },
      };
    case 'producer':
      return {
        ...state,
        producers: {
          ...state.producers,
          [action.id]: action.data,
        },
      };
    case 'producer-closed':
      delete producers[action.id];
      return {
        ...state,
        producers,
      };
    case 'video-producer':
      return {
        ...state,
        cameraProducer: action.videoProducer,
      };
    case 'audio-producer':
      return {
        ...state,
        micProducer: action.audioProducer,
      };
    case 'producer-transport':
      return {
        ...state,
        producerTransport: action.transport,
      };
    case 'consumer-transport':
      return {
        ...state,
        consumerTransport: action.transport,
      };
    case 'join-meeting':
      return {
        ...state,
        router: action.router,
      };
    case 'meeting-id':
      return {
        ...state,
        meetingID: action.meetingID,
        meeting: action.meeting,
      };
    case 'meeting-details':
      return {
        ...state,
        meeting: action.meeting,
      };
    case 'answer-outbound':
    case 'answer-inbound':
      return {
        ...state,
        dialog: false,
      };
    case 'decline-outbound':
    case 'decline-inbound':
    case 'cancel-outbound':
    case 'cancel-inbound':
      return {
        ...state,
        room: null,
        dialog: false,
      };
    case 'call-outbound':
      return {
        ...state,
        room: action.room,
        meeting: action.meeting,
        direction: 'outgoing',
        dialog: true,
      };
    case 'call-inbound':
      return {
        ...state,
        room: action.data.room,
        meeting: action.data.meeting,
        direction: 'incoming',
        dialog: true,
      };
    case 'media-change-camera':
      return {
        ...state,
        camera: action.active,
        video: action.video,
      };
    case 'media-change-mic':
      return {
        ...state,
        mic: action.active,
        audio: action.audio,
      };
    case 'media-loading':
      return initialState;
    case 'media-init':
      return {
        ...state,
        init: true,
        error: false,
        rtpCapabilities: action.rtpCapabilities,
        canAudio: action.canAudio,
        canVideo: action.canVideo,
        device: action.device,
      };
    case 'media-error':
      return {
        ...state,
        init: false,
        error: true,
      };
    case 'meeting-end':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
