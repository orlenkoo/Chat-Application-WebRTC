import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  Box, Button, Grid, TextField, Typography
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import formatBytes from '../../../utils/formatBytes';

const UploadDialog = ({ open, setOpen }) => {
  const [auth, setAuth] = useState(false);
  const [uploadFiles, setFiles] = useState(null);

  return (
    <Dialog open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick>
      <DialogTitle id="form-dialog-title">Upload Files</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select one or multiple files to upload.
          The same description and tags will be applied to all selected files,
          but those can be edited later.
        </DialogContentText>
        <Grid container alignItems="center">
          <Button
            color="primary"
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              onChange={(e) => {
                console.log(e.target.files.length);
                setFiles(e.target.files.length);
                window.size = 0;
                for (let i = 0; i < e.target.files.length; i++) {
                  window.size += e.target.files[i].size;
                }
              }}
              multiple
              hidden
            />
          </Button>
          <Box ml={3}>
            <Typography variant="body1">
              {uploadFiles ? `${uploadFiles} file${uploadFiles > 1 ? 's' : ''} selected, ${formatBytes(window.size || 0)}` : 'No files selected'}
            </Typography>
          </Box>
        </Grid>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Tags (separated by comma)"
          type="email"
          fullWidth
        />
        <Box>
          <FormControlLabel
            control={<Switch checked={auth} onChange={(e) => setAuth(e.target.checked)} name="gilad" />}
            label={auth ? 'Private (requires authentication)' : 'Public (accessible without authentication)'}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(!open)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => setOpen(!open)} color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UploadDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default UploadDialog;
