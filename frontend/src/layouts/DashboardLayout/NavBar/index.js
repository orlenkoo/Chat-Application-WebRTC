import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  Typography,
  makeStyles,
  List, Paper, Tabs, Tab
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Forum from '@material-ui/icons/Forum';
import Contacts from '@material-ui/icons/Contacts';
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar';
import NavItem from './NavItem';
import listRooms from '../../../actions/rooms/listRooms';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 360,
  },
  desktopDrawer: {
    width: 360,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  container: {
    overflowY: 'hidden',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const rooms = useSelector((state) => state.rooms.rooms);
  const search = useSelector((state) => state.rooms.search);
  const config = useSelector((state) => state.config);
  const favorites = [];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      dispatch(listRooms());
    }
  }, [user]);

  const items = (tab ? favorites : rooms.filter((room) => {
    if (room.isGroup) {
      return room.title.toLowerCase().includes(search);
    }
    const other = room.members.find((e) => e._id !== user.id) || {};
    return `${other.firstName} ${other.lastName}`.toLowerCase().includes(search);
  }));

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      className={classes.container}
    >
      <Hidden mdDown>
        <Divider />
      </Hidden>
      <SearchBar />
      <Divider />
      <Paper square>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<Forum />} />
          <Tab icon={<Contacts />} />
        </Tabs>
      </Paper>
      <Box p={2} className={classes.listContainer}>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {tab ? t('Contacts') : t('Recent Conversations')}
        </Typography>
        <List>
          {items.map((room) => {
            const other = room.members.find((e) => e._id !== user.id) || {};

            const item = {
              id: room._id,
              firstName: other.firstName,
              lastName: other.lastName,
              otherId: other._id,
              isGroup: room.isGroup,
              title: room.title,
              message: room.lastMessage,
              lastUpdate: room.lastUpdate,
              picture: room.isGroup ? room.picture : other.picture,
            };

            return (
              <NavItem item={item} key={item.id} />
            );
          })}
        </List>
        {items.length === 0 && (
          <Typography
            className={classes.name}
            color="textPrimary"
            variant="body2"
          >
            {t('No rooms available for the selected filters')}
          </Typography>
        )}
      </Box>
      <Divider />
      {config.demo && (
        <Box
          p={2}
          m={2}
          bgcolor="background.dark"
        >
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {t('Like what you see?')}
          </Typography>
          <Typography
            align="center"
            variant="body2"
          >
            {t('Clover is available for sale on CodeCanyon, full source code included.')}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
          >
            <Button
              color="primary"
              component="a"
              href="https://codecanyon.net/item/clover-realtime-messaging-audio-video-conferencing-web-app-nodejs-react-webrtc-socketio/25737452"
              target="_blank"
              variant="contained"
            >
              {t('Purchase')}
            </Button>
          </Box>
        </Box>
      )}
      <Divider />
      <Box
        py={1}
        px={2}
        style={{ textAlign: 'center' }}
      >
        <Typography
          align="center"
          variant="caption"
        >
          Clover &copy; 2021 - v
          {config.version}
          &nbsp;(
          {config.build}
          )
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
