import { DialogTitle } from '@material-ui/core';
import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Title = ({ type, setType }) => {
  const { t } = useTranslation();

  let title;

  switch (type) {
    case 'people':
      title = t('Find people');
      break;
    case 'group':
    case 'group2':
      title = t('Create a group');
      break;
    case 'meeting':
    case 'meeting2':
      title = t('Schedule a meeting');
      break;
    default:
      title = t('What do you want to do?');
  }

  return (
    <DialogTitle id="customized-dialog-title">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        { type && (
          <div
            style={{
              paddingRight: 6, cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}
            onClick={() => setType('base')}
          >
            <ArrowBack />
          </div>
        )}
        <div>{title}</div>
      </div>
    </DialogTitle>
  );
};

Title.propTypes = {
  type: String,
  setType: PropTypes.func,
};

export default Title;
