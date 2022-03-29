import React from 'react';
import { Button, DialogActions } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import cancel from '../../actions/meetings/cancel';
import decline from '../../actions/meetings/decline';
import answer from '../../actions/meetings/answer';

const Actions = ({ type }) => {
  const { t } = useTranslation();
  const direction = useSelector((state) => state.media.direction);
  const room = useSelector((state) => state.media.room);
  const meeting = useSelector((state) => state.media.meeting);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  switch (type) {
    default:
      return (
        <DialogActions>
          {direction === 'outgoing' && (
            <Button
              onClick={() => {
                dispatch(cancel({ room, meeting: meeting || null }));
              }}
              color="primary"
            >
              {t('Cancel')}
            </Button>
          )}
          {direction === 'incoming' && (
            <Button
              onClick={() => {
                dispatch(decline({ room, meeting: meeting || null }));
              }}
              color="primary"
            >
              {t('Decline')}
            </Button>
          )}
          {direction === 'incoming' && (
            <Button
              onClick={() => {
                dispatch(answer({ room, meeting: meeting || null }));
                if (meeting) {
                  dispatch({ type: 'meeting-id', meetingID: meeting.id });
                  navigate(`/meeting/${meeting._id}`);
                } else {
                  dispatch({
                    type: 'snack',
                    content: 'critical error: unknown meeting id',
                    severity: 'error',
                  });
                }
              }}
              color="primary"
            >
              {t('Accept')}
            </Button>
          )}
        </DialogActions>
      );
  }
};

Actions.propTypes = {
  type: String,
};

export default Actions;
