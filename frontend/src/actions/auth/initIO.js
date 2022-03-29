import io from 'socket.io-client';
import Config from '../../config';
import store from '../../store';
import status from '../users/status';

const socketPromise = require('../../lib/socket.io-promise').promise;

const initIO = (token, navigate) => (dispatch) => {
  const socket = io(Config.url || '', {
    query: { token },
    transports: ['websocket'],
  });

  socket.request = socketPromise(socket);

  socket.on('connect', async () => {
    dispatch(status());
    const response = await socket.request('session', { session: store.getState().auth.session });
    dispatch({ type: 'socket session', session: response.session, socket });

    socket.on('message', (data) => {
      const state = store.getState();
      console.log('data', data);
      if (data.message.author._id !== state.auth.user.id) {
        if (state.room.room) {
          if (data.room._id === state.room.room._id) {
            dispatch({ type: 'send-message', data });
          }
        }
      }
    });

    socket.on('call', (data) => {
      const state = store.getState();
      console.log('data', data);
      if (data.meeting.caller._id !== state.auth.user.id) {
        dispatch({ type: 'call-inbound', data });
      }
    });

    socket.on('answer', (data) => {
      const state = store.getState();
      console.log('data', data);
      if (data.userID !== state.auth.user.id) {
        if (data.meeting.caller._id === store.getState().auth.user.id) {
          dispatch({ type: 'answer-inbound', data });
          dispatch({ type: 'meeting-id', meetingID: data.meeting._id });
          navigate(`/meeting/${data.meeting._id}`);
        }
      }
    });

    socket.on('decline', (data) => {
      const state = store.getState();
      console.log('data', data);
      if (data.userID !== state.auth.user.id) {
        dispatch({
          type: 'snack',
          content: `${data.name} declined the call`,
          severity: 'info',
        });
        if (!data.room.isGroup) {
          dispatch({ type: 'decline-inbound', data });
        }
      }
    });

    socket.on('cancel', (data) => {
      const state = store.getState();
      console.log('data', data);
      if (data.userID !== state.auth.user.id) {
        dispatch({ type: 'cancel-inbound', data });
        dispatch({
          type: 'snack',
          content: 'call canceled by the caller',
          severity: 'info',
        });
      }
    });

    socket.on('online', (data) => {
      dispatch({
        type: 'online',
        id: data.id,
      });
    });

    socket.on('offline', (data) => {
      dispatch({
        type: 'offline',
        id: data.id,
      });
    });

    socket.on('producer', (data) => {
      console.log('producer', data);
      dispatch({
        type: 'producer',
        data,
        id: data.producerID,
      });
    });

    socket.on('producer-closed', (data) => {
      console.log('producer-closed', data);
      dispatch({
        type: 'producer-closed',
        data,
        id: data.producerID,
      });
    });
  });

  window.onbeforeunload = () => {
    socket.disconnect();
  };
};

export default initIO;
