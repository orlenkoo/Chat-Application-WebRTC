import {
  Box,
  DialogContent,
  makeStyles,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useTheme, Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import Search from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import { useTranslation } from 'react-i18next';
import getUsers from '../../../../../actions/users/getUsers';
import Config from '../../../../../config';
import getConversation from '../../../../../actions/rooms/getConversation';

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
    display: 'flex',
    minWidth: 300,
  },
  button: {
    margin: 8,
  },
  popover: {
    padding: theme.spacing(2),
  },
  loader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
}));

const People = ({ setOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers({ text: '' }));
  }, []);

  const selectUser = (user) => {
    dispatch(getConversation({ user: user.id, navigate }));
    setOpen(false);
  };

  return (
    <DialogContent dividers>
      <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
        <TextField
          variant="outlined"
          className={classes.margin}
          label={t('Search by username, email or full name')}
          onChange={(e) => dispatch(getUsers({ text: e.target.value }))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {loading && (
          <Box className={classes.loader}>
            <ClipLoader
              color={theme.palette.primary.deep}
              loading={loading}
              size={30}
            />
          </Box>
        )}
        <List>
          {users.map((user) => {
            const labelId = `checkbox-list-secondary-label-${user.id}`;
            return (
              <ListItem key={user.id} onClick={() => selectUser(user)} button>
                <ListItemAvatar>
                  <Avatar
                    alt={user.firstName}
                    src={user.picture && `${Config.url}/api/vault/${user.picture}?thumbnail=little`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={`@${user.username}`}
                />
              </ListItem>
            );
          })}
        </List>
        {users.length === 0 && !loading && (
          <Typography variant="body2" component="span">{t('No user matches the current filter.')}</Typography>
        )}
      </Box>
    </DialogContent>
  );
};

People.propTypes = {
  setOpen: PropTypes.func,
};

export default People;
