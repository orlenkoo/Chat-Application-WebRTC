import React from 'react';
import {
  Box,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/logo-text.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.primary.main,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 110,
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.root}>
      <img className="logo" src={logo} alt="logo" />
      <Box mt={2} />
      <Typography variant="body1" component="p">
        {t('Welcome to the new UI')}
      </Typography>
      <Typography variant="body1" component="p">
        {t('Tap the plus icon in the top-left corner to begin')}
      </Typography>
    </Box>
  );
};

export default Welcome;
