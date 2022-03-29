import {
  Box, Button, DialogContent, makeStyles,
} from '@material-ui/core';
import EmojiPeople from '@material-ui/icons/EmojiPeople';
import GroupAdd from '@material-ui/icons/GroupAdd';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.deep,
    color: theme.palette.primary.deep,
  },
  avatar: {
    width: 42,
    height: 42
  },
  spacer: {
    width: 24,
    height: 42,
  },
  buttons: {
    display: 'flex'
  },
  button: {
    margin: 8,
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

const Base = ({ setType }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <DialogContent dividers>
      <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => setType('people')}
          color="primary"
          size="large"
        >
          <EmojiPeople />
          &nbsp;
          {t('Find People')}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => setType('group')}
          color="primary"
          size="large"
        >
          <GroupAdd />
          &nbsp;
          {t('Create a Group')}
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => setType('meeting')}
          color="primary"
          size="large"
        >
          <InsertInvitation />
          &nbsp;
          {t('Schedule a Meeting')}
        </Button>
      </Box>
    </DialogContent>
  );
};

Base.propTypes = {
  setType: PropTypes.func,
};

export default Base;
