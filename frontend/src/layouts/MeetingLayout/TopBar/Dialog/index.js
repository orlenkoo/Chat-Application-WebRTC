import {
  Dialog as MaterialDialog
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Content from './Content';
import Actions from './Actions';

const Dialog = ({ open, setOpen }) => {
  const [type, setType] = useState(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => setType(null), 500);
    }
  }, [open]);

  return (
    <MaterialDialog onClose={() => {}} aria-labelledby="customized-dialog-title" open={open}>
      <Title type={type} setType={setType} />
      <Content type={type} setType={setType} setOpen={setOpen} />
      <Actions type={type} setOpen={setOpen} setType={setType} />
    </MaterialDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default Dialog;
