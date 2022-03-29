import { DialogContent, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';

const MeetingDetails = () => {
  const { t } = useTranslation();
  const details = useSelector((state) => state.form.meetingDetails || {});

  return (
    <DialogContent dividers>
      <Typography>
        {t('meeting-pre-title')}
        {details.title || t('No title')}
        {t('meeting-after-title')}
        {moment(details.meetingDate).fromNow()}
        {t('meeting-after-date')}
        {(details.members || []).length - 1}
        {t('meeting-after-members')}
      </Typography>
    </DialogContent>
  );
};

export default MeetingDetails;
