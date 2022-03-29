import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Snack = () => {
  const dispatch = useDispatch();
  const snack = useSelector((state) => state.snack);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: 'snack-out' });
  };

  return (
    <Snackbar open={snack.open} autoHideDuration={snack.autoHideDuration} onClose={handleClose}>
      <Alert onClose={() => dispatch({ type: 'snack-out' })} severity={snack.severity}>
        {snack.content}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
