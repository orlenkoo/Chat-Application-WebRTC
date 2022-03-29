import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles, Avatar, Divider,
  Popover, Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InvertColors from '@material-ui/icons/InvertColors';
import TodayIcon from '@material-ui/icons/Today';
import SecurityIcon from '@material-ui/icons/Security';
import { useTranslation } from 'react-i18next';
import Dialog from './Dialog';
import Config from '../../../config';

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

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dark = useSelector((state) => state.theme.dark);
  const type = useSelector((state) => state.form.type);
  const open = useSelector((state) => !!state.form.open);
  const [anchorEl, setAnchorEl] = useState(null);

  const setType = (value) => dispatch({ type: 'form-type', value });
  const setOpen = (value) => dispatch({ type: 'form-open', value });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.picture && `${Config.url}/api/vault/${user.picture}?thumbnail=little`}
          to="/welcome"
        />
        <Box className={classes.spacer} />
        {(user.roles || []).includes('admin') && (
          <IconButton onClick={() => navigate('/users')} color="inherit">
            <SecurityIcon />
          </IconButton>
        )}
        <IconButton onClick={() => navigate('/settings')} color="inherit">
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={() => navigate('/calendar')} color="inherit">
          <TodayIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setType('base');
            setOpen(!open);
          }}
          color="inherit"
        >
          <AddBoxIcon />
        </IconButton>
        <Box flexGrow={1} />
        <IconButton onClick={() => dispatch({ type: 'set dark mode', dark: !dark })} color="inherit">
          <InvertColors />
        </IconButton>
        <Hidden xsUp>
          <IconButton
            color="inherit"
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdDown>
        <Divider />
      </Hidden>
      <Dialog open={open} setOpen={setOpen} type={type} setType={setType} />
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
          {t('This popover will contain notifications about meetings, groups and reminders')}
        </Typography>
      </Popover>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
