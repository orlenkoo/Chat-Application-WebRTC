import moment from 'moment';

const initialState = {
  rooms: [],
  search: '',
  loading: false,
};

const reducer = (state = initialState, action) => {
  const rooms = [...(state.rooms) || []];
  let room;

  switch (action.type) {
    case 'search':
      return {
        ...state,
        search: (action.search || '').toLowerCase(),
      };
    case 'send-message':
      room = rooms.find((e) => e._id === action.data.room._id);
      if (!room) {
        return state;
      }
      room.lastMessage = action.data.message;
      room.lastUpdate = moment().toISOString();
      return {
        ...state,
        rooms,
      };
    case 'rooms-list-loading':
      return {
        ...state,
        loading: action.loading,
        rooms: action.loading ? [] : state.rooms,
      };
    case 'rooms-list':
      return {
        ...state,
        rooms: (action.data || {}).rooms,
      };
    default:
      return state;
  }
};

export default reducer;
