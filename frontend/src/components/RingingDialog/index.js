import {
  Dialog as MaterialDialog
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Title from './Title';
import Content from './Content';
import Actions from './Actions';

const Dialog = ({ open, setOpen }) => {
  const type = useSelector((state) => state.media.direction);

  return (
    <MaterialDialog onClose={() => {}} aria-labelledby="customized-dialog-title" open={open}>
      <Title type={type} />
      <Content type={type} setOpen={setOpen} />
      <Actions type={type} setOpen={setOpen} />
    </MaterialDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Dialog;
