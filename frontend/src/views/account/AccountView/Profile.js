import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles, useTheme
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ClipLoader from 'react-spinners/ClipLoader';
import uploadFile from '../../../actions/vault/uploadFile';
import Config from '../../../config';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fileInput = useRef();
  const user = useSelector((state) => state.auth.user);
  const loadingPicture = useSelector((state) => state.vault.loading);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Box mt={2} mb={3}>
            <Avatar
              className={classes.avatar}
              src={user.picture && `${Config.url}/api/vault/${user.picture}?thumbnail=little`}
            />
          </Box>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {`${user.name}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {t('Roles')}
            :&nbsp;
            {user.roles.join(', ')}
          </Typography>
          {loadingPicture && (
            <ClipLoader
              color={theme.palette.primary.deep}
              loading={loadingPicture}
            />
          )}
        </Box>
      </CardContent>
      <input
        style={{
          visibility: 'hidden', width: 0, height: 0, padding: 0, margin: 0,
        }}
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={(e) => dispatch(uploadFile(e.target.files[0], { action: 'change-picture' }))}
      />
      <Divider style={{ marginTop: -16 }} />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => fileInput && fileInput.current && fileInput.current.click()}
        >
          {t('Change picture')}
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
