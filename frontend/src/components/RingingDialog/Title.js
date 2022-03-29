import { DialogTitle } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = ({ type }) => {
  const { t } = useTranslation();

  let title;

  switch (type) {
    case 'outgoing':
      title = t('Outgoing call');
      break;
    case 'incoming':
    default:
      title = t('Incoming call');
  }

  return (
    <DialogTitle id="customized-dialog-title">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>{title}</div>
      </div>
    </DialogTitle>
  );
};

Title.propTypes = {
  type: String,
};

export default Title;
