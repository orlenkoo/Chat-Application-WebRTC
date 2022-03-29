import {
  Box,
  DialogContent,
  makeStyles,
  TextField,
  InputAdornment, Avatar, Button, useTheme
} from '@material-ui/core';
import Title from '@material-ui/icons/Title';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { useTranslation } from 'react-i18next';
import uploadFile from '../../../../../actions/vault/uploadFile';
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
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    marginBottom: 16,
  },
  popover: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fontSize: theme.spacing(4)
  },
}));

const Base = () => {
  const classes = useStyles();
  const fileInput = useRef();
  const theme = useTheme();
  const loadingPicture = useSelector((state) => state.vault.loading);
  const createGroupPicture = useSelector((state) => state.form.createGroupPicture);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const title = useSelector((state) => state.form.createGroupTitle);

  return (
    <DialogContent dividers>
      <Box className={classes.buttons} flex={1} flexDirection="column" justifyContent="center">
        <Avatar
          alt={title || '-'}
          src={createGroupPicture && `${Config.url}/api/vault/${createGroupPicture}?thumbnail=little`}
          className={classes.large}
        />
        <Button
          onClick={() => fileInput && fileInput.current && fileInput.current.click()}
          color="primary"
          className={classes.button}
        >
          {t('Change picture')}
        </Button>
        {loadingPicture && (
          <ClipLoader
            color={theme.palette.primary.deep}
            loading={loadingPicture}
          />
        )}
        <TextField
          variant="outlined"
          className={classes.margin}
          label={t('Group title')}
          value={title}
          onChange={(e) => dispatch({ type: 'create-group-title', title: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Title />
              </InputAdornment>
            ),
          }}
        />
        <input
          style={{
            visibility: 'hidden', width: 0, height: 0, padding: 0, margin: 0,
          }}
          type="file"
          ref={fileInput}
          accept="image/*"
          onChange={(e) => dispatch(uploadFile(e.target.files[0], { action: 'create-group-picture' }))}
        />
      </Box>
    </DialogContent>
  );
};

export default Base;
