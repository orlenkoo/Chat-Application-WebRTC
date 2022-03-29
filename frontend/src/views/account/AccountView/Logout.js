import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Card,
  CardActions, Dialog, DialogActions, DialogContent, DialogTitle,
  makeStyles
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import logout from '../../../actions/auth/logout';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => setOpen(true)}
        >
          {t('Log out')}
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('Confirmation')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('Are you sure you want to log out?')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={() => dispatch(logout({ navigate }))} color="primary">
            {t('Log out')}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
