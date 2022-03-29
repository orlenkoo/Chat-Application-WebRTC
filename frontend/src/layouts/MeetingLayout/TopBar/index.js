import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  makeStyles, Hidden, Typography, Popover
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import CallEndIcon from '@material-ui/icons/CallEnd';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dialog from './Dialog';
import changeMic from '../../../actions/media/changeMic';
import changeCamera from '../../../actions/media/changeCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.deep,
    color: theme.palette.primary.deep,
    bottom: 0,
    top: 'initial',
    maxHeight: 64,
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

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const camera = useSelector((state) => state.media.camera);
  const mic = useSelector((state) => state.media.mic);
  const producers = useSelector((state) => state.media.producers || {});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const producersArray = Object.keys(producers).map((key) => producers[key]);
  const usersObj = {};
  producersArray.forEach((producer) => {
    usersObj[producer.userId] = producer.user;
  });
  const users = Object.keys(usersObj).map((key) => usersObj[key]);

  console.log('users', users);
  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>

        <Box flexGrow={1}>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {!location.pathname.includes('join') && (
          <Box flexGrow={1} display="flex" flexDirection="row" justifyContent="center">
            <Box px={1}>
              <IconButton
                color="inherit"
                onClick={() => dispatch(changeMic(!mic))}
              >
                {mic ? <MicIcon /> : <MicOffIcon />}
              </IconButton>
            </Box>
            <Box px={1}>
              <IconButton
                color="inherit"
                onClick={() => {
                  dispatch(changeMic(false));
                  dispatch(changeCamera(false));
                  dispatch({ type: 'meeting-end' });
                  navigate('/welcome');
                }}
                style={{ color: 'red' }}
              >
                <CallEndIcon />
              </IconButton>
            </Box>
            <Box px={1}>
              <IconButton
                color="inherit"
                onClick={() => dispatch(changeCamera(!camera))}
              >
                {camera ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
            </Box>
            <Hidden xsUp>
              <Box px={1}>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    dispatch({ type: 'snack', content: 'coming soon: add people to meeting', severity: 'info' });
                  }}
                >
                  <AddIcCallIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsUp>
              <Box px={1}>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    dispatch({ type: 'snack', content: 'coming soon: screen share', severity: 'info' });
                  }}
                >
                  <ScreenShareIcon />
                </IconButton>
              </Box>
            </Hidden>
          </Box>
        )}

        <Box flexGrow={1} display="flex" flexDirection="row" justifyContent="flex-end">
          <Popover
            id={id}
            open={popoverOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography className={classes.popover}>
              {users.length}
              {t('people-in-meeting')}
              {users.map((e) => `${e.firstName} ${e.lastName}`).join(', ') || '-'}
            </Typography>
          </Popover>
          <IconButton
            color="inherit"
            aria-describedby={id}
            onClick={handleClick}
          >
            <PeopleIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Dialog open={open} setOpen={setOpen} />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
