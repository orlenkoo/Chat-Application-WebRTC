import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  Box,
  makeStyles,
  Typography,
  IconButton, Hidden, Badge, withStyles, Popover
} from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import Call from '@material-ui/icons/Call';
import VideoCall from '@material-ui/icons/VideoCall';
import Info from '@material-ui/icons/Info';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Config from '../../../config';
import call from '../../../actions/meetings/call';
import getLastOnline from '../../../actions/users/getLastOnline';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    height: 78,
    minHeight: 78,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderBottom: theme.dark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
  },
  user: {
    paddingLeft: 16,
  },
  popover: {
    padding: theme.spacing(2),
    background: theme.palette.background.deep,
  },
}));

const Status = ({
  user, lastOnline, online, busy, away, room,
}) => {
  if (room.isGroup) {
    return `${room.members.length} members`;
  }

  const lastOnlineDate = (lastOnline.find((e) => e && user && e._id === user._id) || {})
    .lastOnline;

  if (online.includes(user._id)) {
    return 'online';
  }

  if (busy.includes(user._id)) {
    return 'busy';
  }

  if (away.includes(user._id)) {
    return 'away';
  }

  return `Last online: ${lastOnlineDate ? moment(lastOnlineDate).fromNow() : 'never'}`;
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const Header = ({ other, room }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { online, busy, away } = useSelector((state) => state.users);
  const lastOnline = useSelector((state) => state.users.lastOnline || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const title = room.isGroup ? room.title : `${other.firstName} ${other.lastName}`;

  const picture = room.isGroup ? room.picture : other.picture;

  useEffect(() => {
    if (!room.isGroup) {
      dispatch(getLastOnline({ user: other._id }));
    }
  }, [online, busy, away, other]);

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <Grid className={classes.header}>
      {(!room.isGroup && online.includes(other._id)) ? (
        <StyledBadge
          overlap="circle"
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={picture && `${Config.url}/api/vault/${picture}?thumbnail=little`}
            to="/dashboard"
          />
        </StyledBadge>
      ) : (
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={picture && `${Config.url}/api/vault/${picture}?thumbnail=little`}
          to="/dashboard"
        />
      )}
      <Box className={classes.info}>
        <Typography className={classes.user} variant="h4" component="h4">
          {title}
        </Typography>
        <Hidden xsDown>
          <Typography className={classes.user} variant="body2" component="p">
            <Status
              room={room}
              user={other}
              lastOnline={lastOnline}
              online={online}
              busy={busy}
              away={away}
            />
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.user} variant="body2" component="p">
            <Status
              room={room}
              user={other}
              lastOnline={lastOnline}
              online={online}
              busy={busy}
              away={away}
            />
          </Typography>
        </Hidden>
      </Box>
      <Box flexGrow={1} />
      <IconButton
        color="inherit"
        onClick={() => {
          dispatch(call({ room, video: true }));
        }}
      >
        <VideoCall />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => {
          dispatch(call({ room, video: false }));
        }}
      >
        <Call />
      </IconButton>
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
          {room.members.length}
          {t('members-colon')}
          {room.members.map((e) => `${e.firstName} ${e.lastName}`).join(', ') || '-'}
        </Typography>
      </Popover>
      <IconButton
        color="inherit"
        aria-describedby={id}
        onClick={handleClick}
      >
        <Info />
      </IconButton>
    </Grid>
  );
};

Header.propTypes = {
  other: Object,
  room: Object,
};

export default Header;
