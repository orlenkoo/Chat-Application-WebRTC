import {
  Avatar,
  Box, DialogContent, makeStyles, Typography
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Config from '../../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.deep,
    color: theme.palette.primary.deep,
  },
  avatar: {
    width: 160,
    height: 160
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

const Base = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const room = useSelector((state) => state.media.room);

  if (!room) {
    return (
      <DialogContent dividers>
        <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mx={4} my={2}>
            <Box mb={2}>
              <Box width={160} height={186} />
            </Box>
          </Box>
        </Box>
      </DialogContent>
    );
  }

  const other = room.members.find((e) => e._id !== user.id);

  const title = room.isGroup ? room.title : `${other.firstName} ${other.lastName}`;

  const picture = room.isGroup ? room.picture : other.picture;

  return (
    <DialogContent dividers>
      <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mx={4} my={2}>
          <Box mb={2}>
            <Avatar
              className={classes.avatar}
              src={picture && `${Config.url}/api/vault/${picture}?thumbnail=medium`}
            />
          </Box>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </DialogContent>
  );
};

export default Base;
