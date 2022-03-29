import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Box, Button, makeStyles, TextField,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import editUser from '../../../actions/admin/users/editUser';

const useStyles = makeStyles(() => ({
  margin: {
    marginTop: 8,
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 8,
  },
  marginBottom: {
    marginTop: 8,
    marginBottom: 8,
  },
}));

const EditDialog = ({ open, setOpen, user = {} }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [tenant, setTenant] = useState(user.tenant);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setEmail(user.email);
    setTenant(user.tenant);
  }, [user]);

  return (
    <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick>
      <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            variant="outlined"
            className={classes.marginTop}
            value={firstName}
            label={t('First name')}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.margin}
            value={lastName}
            label={t('Last name')}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.margin}
            value={username}
            label={t('Username')}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.margin}
            value={email}
            label={t('Email')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.marginBottom}
            value={password}
            type="password"
            label={t('Password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.margin}
            value={tenant}
            label={t('Tenant')}
            onChange={(e) => setTenant(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            dispatch(editUser({
              id: user.id,
              firstName,
              lastName,
              username: username === user.username ? null : username,
              email: email === user.email ? null : email,
              popupUsername: user.username,
              password,
              tenant,
              setOpen,
            }));
          }}
          color="primary"
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  user: PropTypes.object,
};

export default EditDialog;
