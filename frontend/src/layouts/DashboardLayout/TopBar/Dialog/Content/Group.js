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
  useTheme, ListItemSecondaryAction, Checkbox, Typography
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ClipLoader from 'react-spinners/ClipLoader';
import getUsers from '../../../../../actions/users/getUsers';
import Config from '../../../../../config';

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

const Base = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.users);
  const checked = useSelector((state) => state.form.createGroupSelection);

  useEffect(() => {
    dispatch(getUsers({ text: '' }));
    dispatch({ type: 'create-group-selection', list: [] });
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    dispatch({ type: 'create-group-selection', list: newChecked });
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
              <ListItem
                key={user.id}
                onClick={handleToggle(user.id)}
                button
              >
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
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(user.id)}
                    checked={checked.indexOf(user.id) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                    style={{ color: theme.palette.primary.deep }}
                  />
                </ListItemSecondaryAction>
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

export default Base;
