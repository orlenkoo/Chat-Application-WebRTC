import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Box, Button, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formatBytes from '../../../utils/formatBytes';

const DeleteDialog = ({ open, setOpen, shield }) => {
  const [permanent, setPermanent] = useState(true);

  return (
    <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick>
      <DialogTitle id="form-dialog-title">Delete File</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Delete file "${shield.name}"?`}
        </DialogContentText>
        <Box>
          <FormControlLabel
            control={<Switch checked={permanent} onChange={(e) => setPermanent(e.target.checked)} name="gilad" />}
            label="Delete permanently"
          />
        </Box>
        {permanent && <Typography variant="body2">{`${formatBytes(shield.size)} will be freed`}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => setOpen(!open)} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  shield: PropTypes.object,
};

export default DeleteDialog;
