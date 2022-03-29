import React, { useEffect, useRef } from 'react';
import {
  Avatar, Box, Button, Card, makeStyles, Typography, useTheme
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate, useParams } from 'react-router';
import Config from '../../../config';
import getRtpCapabilities from '../../../actions/media/getRtpCapabilities';
import changeCamera from '../../../actions/media/changeCamera';
import changeMic from '../../../actions/media/changeMic';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 96,
    height: 96,
  },
}));

const JoinView = () => {
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();
  const theme = useTheme();
  const videoRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const mic = useSelector((state) => state.media.mic);
  const camera = useSelector((state) => state.media.camera);
  const video = useSelector((state) => state.media.video);
  const init = useSelector((state) => state.media.init);
  const error = useSelector((state) => state.media.error);

  const meetingID = params.id;

  useEffect(() => {
    dispatch(getRtpCapabilities({ meetingId: params.id }));
  }, []);

  useEffect(() => {
    dispatch({ type: 'meeting-id', meetingID: params.id });
  }, [params.id]);

  useEffect(() => {
    if (!videoRef || !videoRef.current) {
      return;
    }
    if (video) {
      videoRef.current.srcObject = video.stream;
      videoRef.current.play();
    } else {
      videoRef.current.srcObject = null;
    }
  }, [video]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%">
      {(init && !error) && (
        <Card>
          <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            <Box mb={3}>
              <Typography
                variant="h3"
                component="p"
                style={{ color: theme.palette.primary.deep }}
              >
                Join the meeting
              </Typography>
            </Box>
            {!video && (
              <Avatar
                className={classes.avatar}
                component={RouterLink}
                src={user.picture && `${Config.url}/api/vault/${user.picture}?thumbnail=medium`}
                to="/welcome"
              />
            )}
            <video
              ref={videoRef}
              style={{
                width: 240,
                height: video ? 135 : 0,
                objectFit: 'contain',
                background: 'black',
                transform: 'rotateY(180deg)',
              }}
            />
            <Box display="flex" pt={3}>
              <Box pr={1}>
                <ToggleButtonGroup
                  value={mic}
                  exclusive
                  onChange={(e, value) => dispatch(changeMic(value))}
                >
                  <ToggleButton value={false}>
                    <MicOffIcon />
                  </ToggleButton>
                  <ToggleButton value>
                    <MicIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box pl={1}>
                <ToggleButtonGroup
                  value={camera}
                  exclusive
                  onChange={(e, value) => dispatch(changeCamera(value))}
                >
                  <ToggleButton value={false}>
                    <VideocamOffIcon />
                  </ToggleButton>
                  <ToggleButton value>
                    <VideocamIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box width="100%" display="flex" pt={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  navigate(`/meeting/${meetingID}`);
                }}
              >
                Join
              </Button>
            </Box>
          </Box>
        </Card>
      )}
      {(!init) && (
        <Card>
          <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            <ClipLoader
              color={theme.palette.primary.deep}
              loading={init}
              size={30}
            />
          </Box>
        </Card>
      )}
      {(error) && (
        <Card>
          <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            <Typography
              variant="p1"
              component="p"
              style={{ color: theme.palette.primary.deep }}
            >
              Could not connect to server
            </Typography>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default JoinView;
