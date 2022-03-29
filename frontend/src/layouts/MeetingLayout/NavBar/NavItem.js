import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar, Box,
  Button,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import getRoom from '../../../actions/rooms/getRoom';
import Config from '../../../config';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto',
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  content: {
    flexDirection: 'column',
    marginLeft: 16,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    marginLeft: 8,
  },
  info: {
    flexDirection: 'column',
  },
  badgeWrapper: {
    textAlign: 'center',
  },
  badge: {
    fontSize: 11,
    color: 'gray',
    background: 'white',
    padding: '2px 5px',
    borderRadius: 20,
  },
  time: {
    fontSize: 11,
    color: 'gray'
  },
}));

const getSystemMessage = (text) => {
  switch (text) {
    case 'created':
    default:
      return 'room created';
  }
};

const NavItem = ({ item }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = item.title || `${item.firstName} ${item.lastName}`;
  let content = '';

  switch (item.message.type) {
    case 'system':
      content = `System: ${getSystemMessage(item.message.content || '')}`;
      break;
    default:
      content = item.message.content;
      break;
  }

  return (
    <ListItem
      className={classes.item}
      disableGutters
      onClick={() => {
        dispatch(getRoom({ room: item.id }));
        navigate(`/room/${item.id}`);
      }}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={`/room/${item.id}`}
      >
        <Avatar
          className={classes.avatar}
          src={item.picture && `${Config.url}/api/vault/${item.picture}?thumbnail=little`}
        />
        <Box className={classes.content}>
          <Box className={classes.title}>
            {title}
          </Box>
          <Box className={classes.text}>
            {content.substr(0, 26)}
            {content.length > 26 ? '...' : ''}
          </Box>
        </Box>
        <Box className={classes.info}>
          {/* <Box className={classes.badgeWrapper}>
            <span className={classes.badge}>
              2
            </span>
          </Box> */}
          <Box className={classes.time}>
            {moment(item.lastUpdate).fromNow()}
          </Box>
        </Box>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
};

export default NavItem;
