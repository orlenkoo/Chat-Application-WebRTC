import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
  Box, Button, makeStyles, TextField,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import createUser from '../../../actions/admin/users/createUser';

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

const CreateDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenant, setTenant] = useState('');

  return (
    <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick>
      <DialogTitle id="form-dialog-title">Create User</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            variant="outlined"
            className={classes.marginTop}
            label={t('First name')}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.margin}
            label={t('Last name')}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.margin}
            label={t('Username')}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.margin}
            label={t('Email')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.marginBottom}
            type="password"
            label={t('Password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            className={classes.marginBottom}
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
            dispatch(createUser({
              firstName, lastName, username, email, password, tenant, setOpen,
            }));
          }}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default CreateDialog;
