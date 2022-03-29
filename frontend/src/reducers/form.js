const initialState = {
  createGroupPicture: null,
  createGroupSelection: [],
  createGroupTitle: '',
  createMeetingSelection: [],
  createMeetingTitle: '',
  createMeetingDate: null,
  type: null,
  open: false,
  meetingDetails: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'meeting-details':
      return {
        ...state,
        meetingDetails: action.details,
      };
    case 'form-type':
      return {
        ...state,
        type: action.value,
      };
    case 'form-open':
      return {
        ...state,
        open: action.value,
      };
    case 'create-group-title':
      return {
        ...state,
        createGroupTitle: action.title,
      };
    case 'create-group-selection':
      return {
        ...state,
        createGroupSelection: action.list,
      };
    case 'create-group-picture':
      return {
        ...state,
        createGroupPicture: action.shield,
      };
    case 'create-meeting-title':
      return {
        ...state,
        createMeetingTitle: action.title,
      };
    case 'create-meeting-selection':
      return {
        ...state,
        createMeetingSelection: action.list,
      };
    case 'create-meeting-date':
      return {
        ...state,
        createMeetingDate: action.date,
      };
    case 'clear-create-meeting-form':
      return {
        ...state,
        createMeetingSelection: [],
        createMeetingTitle: '',
        createMeetingDate: null,
      };
    default:
      return state;
  }
};

export default reducer;
