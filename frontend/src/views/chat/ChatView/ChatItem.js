import React, { useState } from 'react';
import {
  Box,
  makeStyles,
  Typography,
  Card, Dialog, AppBar, Toolbar, IconButton, Slide, Button,
} from '@material-ui/core';
import striptags from 'striptags';
import { Close } from '@material-ui/icons';
import moment from 'moment';
import Config from '../../../config';

const useStyles = makeStyles((theme) => ({
  message: {
    margin: 4,
    color: 'white',
    flexDirection: 'column',
    display: 'flex',
  },
  cardStart: {
    padding: '10px 16px',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 0,
    minWidth: 0,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  cardEnd: {
    padding: '10px 16px',
    backgroundColor: theme.palette.primary.honey,
    color: theme.dark ? '#121212' : 'white',
    flexGrow: 0,
    minWidth: 0,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  systemMessageCard: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.deep,
    flexGrow: 0,
    minWidth: 0,
    maxWidth: '80%',
    alignSelf: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  authorTime: {
    color: theme.dark ? 'white' : '#121212',
    width: '100%',
    marginBottom: 4,
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SystemMessage = ({ content }) => {
  const classes = useStyles();
  switch (content) {
    case 'created':
    default:
      return (
        <Box className={classes.message} textAlign="center">
          <Card className={classes.systemMessageCard}>
            <Typography variant="caption" component="p">
              ROOM CREATED
            </Typography>
          </Card>
        </Box>
      );
  }
};

SystemMessage.propTypes = {
  content: String,
};

const ChatItem = ({
  item, next, isGroup,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState({});

  if (item.type === 'system') {
    return <SystemMessage content={item.content} />;
  }

  const convertUrls = (text) => {
    // eslint-disable-next-line
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // eslint-disable-next-line
    return text.replace(urlRegex, (url) => {
      // eslint-disable-next-line
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
  };

  const Content = () => {
    switch (item.type) {
      case 'mixed':
        return (
          <Card
            className={item.isMine ? classes.cardEnd : classes.cardStart}
            style={{ padding: 0 }}
            onClick={() => {
              setLightbox(item.files[0]);
              setOpen(true);
            }}
          >
            <img
              src={`${Config.url}/api/vault/${item.files[0].shield}?thumbnail=medium`}
              alt={item.files[0].name}
              style={{
                marginBottom: -6,
                width: '100%',
                minWidth: '200',
                height: 200,
                maxWidth: 400,
                cursor: 'pointer',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '10px 16px' }}>
              <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: convertUrls(striptags(
                      (item.content || '').replaceAll('\n', '<br />'),
                      ['a', 'strong', 'b', 'i', 'em', 'u', 'br']
                    )),
                  }}
                />
              </Typography>
            </div>
          </Card>
        );
      case 'files':
        return (
          <Card
            className={item.isMine ? classes.cardEnd : classes.cardStart}
            style={{ padding: 0 }}
            onClick={() => {
              setLightbox(item.files[0]);
              setOpen(true);
            }}
          >
            <img
              src={`${Config.url}/api/vault/${item.files[0].shield}?thumbnail=medium`}
              alt={item.files[0].name}
              style={{
                marginBottom: -6,
                width: '100%',
                minWidth: '200',
                maxWidth: 400,
                height: 200,
                cursor: 'pointer',
                objectFit: 'cover',
              }}
            />
          </Card>
        );
      default:
        return (
          <Card className={item.isMine ? classes.cardEnd : classes.cardStart}>
            <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: convertUrls(striptags(
                    (item.content || '').replaceAll('\n', '<br />'),
                    ['a', 'strong', 'b', 'i', 'em', 'u', 'br']
                  )),
                }}
              />
            </Typography>
          </Card>
        );
    }
  };

  const isNextFromDifferentAuthor = !next || item.author._id !== next.author._id;
  const isPreviousFarInTime = next && moment(next.date).subtract(4, 'minutes').isAfter(moment(item.date));

  return (
    <Box className={classes.message} textAlign={item.isMine ? 'right' : 'left'}>
      {/* TODO show modal with author, datetime and reactions */}
      <Content />
      {(isNextFromDifferentAuthor || isPreviousFarInTime) && (
        <Typography
          variant="caption"
          component="div"
          className={classes.authorTime}
          textAlign={item.isMine ? 'right' : 'left'}
        >
          {!item.isMine && isGroup && 'Delta Honey - '}
          {moment(item.date).format('MMM D, h:mm A')}
        </Typography>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="end" color="inherit" onClick={() => setOpen(false)} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {lightbox.name}
            </Typography>
            <Button color="inherit" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <img
          src={`${Config.url}/api/vault/${lightbox.shield}`}
          alt={lightbox.name}
          style={{ flex: 1, height: '100%', objectFit: 'contain' }}
        />
      </Dialog>
    </Box>
  );
};

ChatItem.propTypes = {
  item: {
    isMine: Boolean,
    content: String,
  },
  next: Object,
  isGroup: Boolean,
};

export default ChatItem;
