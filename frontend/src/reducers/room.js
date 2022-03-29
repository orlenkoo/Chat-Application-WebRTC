const initialState = {
  room: null,
  loading: false,
  messages: [],
  loadingMessages: false,
  loadingSend: false,
  upload: [],
};

const reducer = (state = initialState, action) => {
  let messages = [...(state.messages) || []];

  switch (action.type) {
    case 'remove-attachments':
      return {
        ...state,
        upload: [],
      };
    case 'attach-to-message':
      return {
        ...state,
        upload: [action.shield]
      };
    case 'send-message-loading':
      if (action.loading) {
        messages.push(action.message);
      } else {
        messages = messages.filter((e) => e._id !== action.message._id);
      }
      return {
        ...state,
        loadingSend: action.loading,
        messages,
      };
    case 'send-message':
      return {
        ...state,
        messages: [...state.messages, action.data.message],
      };
    case 'room-loading':
      return {
        ...state,
        loading: action.loading,
        room: action.loading ? null : state.room,
      };
    case 'room':
      return {
        ...state,
        room: (action.data || {}).room,
      };
    case 'messages-list-loading':
      return {
        ...state,
        loadingMessages: action.loading,
        messages: action.loading ? null : state.messages,
      };
    case 'messages-list':
      return {
        ...state,
        messages: (action.data || {}).messages,
      };
    default:
      return state;
  }
};

export default reducer;
