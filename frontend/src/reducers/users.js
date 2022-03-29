const initialState = {
  users: [],
  loading: false,
  online: [],
  busy: [],
  away: [],
  lastOnline: [],
};

const reducer = (state = initialState, action) => {
  const users = [...state.users];
  const online = [...state.online];
  const busy = [...state.busy];
  const away = [...state.away];
  const lastOnline = [...state.lastOnline];
  let i;

  switch (action.type) {
    case 'user-edit':
      i = users.findIndex((e) => e.id === action.user._id);
      if (i >= 0) {
        users[i] = {
          ...users[i],
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          username: action.user.username,
          email: action.user.email,
          fullName: action.user.fullName,
          tenant: action.user.tenant,
        };
      }
      return {
        ...state,
        users,
      };
    case 'user-create':
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case 'user-delete':
      return {
        ...state,
        users: [...state.users].filter((e) => e.id !== action.id),
      };
    case 'users-loading':
      return {
        ...state,
        loading: action.loading,
        users: action.loading ? [] : state.users,
      };
    case 'users':
      return {
        ...state,
        users: (action.data || {}).users || [],
      };
    case 'status':
      return {
        ...state,
        online: action.data.online,
        busy: action.data.busy,
        away: action.data.away,
      };
    case 'online':
      if (!online.includes(action.id)) {
        online.push(action.id);
      }
      if (busy.includes(action.id)) {
        busy.splice(busy.indexOf(action.id), 1);
      }
      if (away.includes(action.id)) {
        away.splice(away.indexOf(action.id), 1);
      }
      return {
        ...state,
        online,
        busy,
        away,
      };
    case 'offline':
      if (online.includes(action.id)) {
        online.splice(online.indexOf(action.id), 1);
      }
      if (busy.includes(action.id)) {
        busy.splice(busy.indexOf(action.id), 1);
      }
      if (away.includes(action.id)) {
        away.splice(away.indexOf(action.id), 1);
      }
      return {
        ...state,
        online,
        busy,
        away,
      };
    case 'last-online':
      i = lastOnline.findIndex((e) => e._id === action.user);
      if (i > -1) {
        lastOnline[i].lastOnline = action.data.lastOnline;
      } else {
        lastOnline.push(action.data);
      }
      return {
        ...state,
        lastOnline,
      };
    default:
      return state;
  }
};

export default reducer;
