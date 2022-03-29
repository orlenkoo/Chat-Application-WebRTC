import React from 'react';
import PropTypes from 'prop-types';
import { Button, DialogActions } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import createGroup from '../../../../actions/rooms/createGroup';

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
              dispatch({
                type: 'snack',
                content: 'scheduled meetings are still under development',
                severity: 'info',
              });
              setOpen(false);
            }}
            color="primary"
          >
            {t('Schedule')}
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
