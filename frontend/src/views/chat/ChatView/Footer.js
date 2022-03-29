import React, { useRef, useState } from 'react';
import {
  makeStyles,
  IconButton,
  Popover,
  useTheme, Badge
} from '@material-ui/core';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Spellcheck from '@material-ui/icons/Spellcheck';
import FormControl from '@material-ui/core/FormControl';
import { Picker } from 'emoji-mart';
import { useDispatch, useSelector } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css';
import './fix.css';
import sendMessage from '../../../actions/rooms/sendMessage';
import uploadFile from '../../../actions/vault/uploadFile';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 78,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderBottom: theme.dark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    maxHeight: 240,
  },
  user: {
    paddingLeft: 16,
  },
  formControl: {
    flexGrow: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  input: {
    maxHeight: 220,
    backgroundColor: theme.palette.background.default,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const fileInput = useRef();
  const classes = useStyles();
  const input = useRef({ scrollHeight: 56 });
  const [text, setText] = useState('');
  const [reload, setReload] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.room);
  const upload = useSelector((state) => state.room.upload || []);
  const loading = useSelector((state) => state.vault.loading);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const send = () => {
    if ((!text || text === '') && upload.length === 0) {
      return;
    }
    let type = 'text';
    if (upload.length > 0 && text && text.length > 0) {
      type = 'mixed';
    }
    if (upload.length > 0 && (!text || text.length === 0)) {
      type = 'files';
    }
    dispatch(sendMessage({
      content: text, type, room: room._id, file: null,
    }));
    setText('');
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

  return (
    <div className={classes.header} style={{ minHeight: input.current.scrollHeight + 20 }}>
      <Popover
        id={id}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Picker
          native
          onSelect={(e) => setText(text + e.native)}
          theme={theme.palette.primary.deep === '#ffffff' ? 'dark' : 'light'}
        />
      </Popover>
      <IconButton color="inherit" onClick={handleClick}>
        <InsertEmoticon />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => {
          if (upload.length > 0) {
            dispatch({ type: 'remove-attachments' });
          } else if (fileInput && fileInput.current) {
            fileInput.current.click();
          }
        }}
      >
        <Badge
          color="primary"
          badgeContent={upload.length}
          variant={loading ? 'dot' : 'standard'}
        >
          <AttachFile />
        </Badge>
      </IconButton>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Type a message</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={text}
          ref={input}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              send();
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
            setTimeout(() => setReload(!reload), 1);
          }}
          endAdornment={(
            <InputAdornment position="end">
              <Spellcheck />
            </InputAdornment>
          )}
          labelWidth={118}
          multiline
          className={classes.input}
          rowsMax={4}
        />
      </FormControl>
      <IconButton color="inherit" onClick={send}>
        <Send />
      </IconButton>
      <input
        style={{
          visibility: 'hidden', width: 0, height: 0, padding: 0, margin: 0,
        }}
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={(e) => dispatch(uploadFile(e.target.files[0], { action: 'attach-to-message' }))}
      />
    </div>
  );
};

export default Footer;
