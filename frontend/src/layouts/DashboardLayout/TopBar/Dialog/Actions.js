import React from 'react';
import PropTypes from 'prop-types';
import { Button, DialogActions } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import createGroup from '../../../../actions/rooms/createGroup';
import schedule from '../../../../actions/events/schedule';
import remove from '../../../../actions/events/remove';

const Actions = ({ type, setOpen, setType }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const form = useSelector((state) => state.form);
  const navigate = useNavigate();

  switch (type) {
    case 'contacts':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Close')}
          </Button>
        </DialogActions>
      );
    case 'people':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Close')}
          </Button>
        </DialogActions>
      );
    case 'group':
      return (
        <DialogActions>
          <Button onClick={() => setType('group2')} color="primary">
            {t('Next')}
          </Button>
        </DialogActions>
      );
    case 'group2':
      return (
        <DialogActions>
          <Button
            onClick={() => {
              if (!form.createGroupTitle) {
                dispatch({
                  type: 'snack',
                  content: 'group title required',
                  severity: 'error',
                });
                return;
              }
              dispatch(createGroup({
                title: form.createGroupTitle,
                picture: form.createGroupPicture,
                users: form.createGroupSelection,
                navigate
              }));
              setOpen(false);
            }}
            color="primary"
          >
            {t('Create')}
          </Button>
        </DialogActions>
      );
    case 'meeting':
      return (
        <DialogActions>
          <Button onClick={() => setType('meeting2')} color="primary">
            {t('Next')}
          </Button>
        </DialogActions>
      );
    case 'meeting2':
      return (
        <DialogActions>
          <Button
            onClick={() => {
              if (!form.createMeetingTitle) {
                dispatch({
                  type: 'snack',
                  content: 'meeting title required',
                  severity: 'error',
                });
                return;
              }
              dispatch(schedule({
                title: form.createMeetingTitle,
                members: form.createMeetingSelection,
                date: form.createMeetingDate,
              }));
              setOpen(false);
            }}
            color="primary"
          >
            {t('Schedule')}
          </Button>
        </DialogActions>
      );
    case 'meeting-details':
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Close')}
          </Button>
          <Button
            onClick={() => {
              dispatch(remove({ id: form.meetingDetails._id }));
              setOpen(false);
            }}
            color="primary"
          >
            {t('Delete')}
          </Button>
          <Button
            onClick={() => {
              navigate(`/meeting/${form.meetingDetails.meeting}/join`);
              setOpen(false);
            }}
            color="primary"
          >
            {t('Join')}
          </Button>
        </DialogActions>
      );
    default:
      return (
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Close')}
          </Button>
        </DialogActions>
      );
  }
};

Actions.propTypes = {
  type: String,
  setOpen: PropTypes.func,
  setType: PropTypes.func,
};

export default Actions;
