import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Button } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import deleteUser from '../../../actions/admin/users/deleteUser';

const DeleteDialog = ({ open, setOpen, user }) => {
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick>
      <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Delete ${user.username}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteUser({ id: user.id, username: user.username }));
            setOpen(false);
          }}
          color="primary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  user: PropTypes.object,
};

export default DeleteDialog;
