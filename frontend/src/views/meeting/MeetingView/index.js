import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import getMeeting from '../../../actions/meetings/getMeeting';
import changeMic from '../../../actions/media/changeMic';
import changeCamera from '../../../actions/media/changeCamera';
import initMeeting from '../../../actions/media/initMeeting';
import produce from '../../../actions/media/produce';
import consume from '../../../actions/media/consume';

/* eslint-disable */

const Audio = ({ producer }) => {
  const audio = useRef();

  useEffect(() => {
    if (producer.stream && audio && audio.current) {
      audio.current.srcObject = producer.stream.media;
    }
  }, [audio, producer.stream]);

  return (
    <video
      ref={audio}
      style={{ width: 0, height: 0, visibility: 'hidden' }}
      autoPlay
      hidden
      muted={false}
    />
  )
}

const Video = ({ producer }) => {
  const video = useRef();

  useEffect(() => {
    if (producer.stream && video && video.current) {
      video.current.srcObject = producer.stream.media;
    }
  }, [video, producer.stream]);

  return (
    <video
      ref={video}
      style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'black' }}
      autoPlay
      muted
    />
  )
}

const MeetingView = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetingID = useSelector((state) => state.media.meetingID);
  const meeting = useSelector((state) => state.media.meeting);
  const mic = useSelector((state) => state.media.mic);
  const camera = useSelector((state) => state.media.camera);
  const router = useSelector((state) => state.media.router);
  const cameraProducer = useSelector((state) => state.media.cameraProducer);
  const micProducer = useSelector((state) => state.media.micProducer);
  const producerTransport = useSelector((state) => state.media.producerTransport);
  const consumerTransport = useSelector((state) => state.media.consumerTransport);
  const producers = useSelector((state) => state.media.producers);

  useEffect(() => {
    if (meetingID !== params.id) {
      navigate(`/meeting/${params.id}/join`);
      return;
    }
    if (meeting && meetingID === meeting._id) {
      if (meeting.isCall && !mic) {
        dispatch(changeMic(true));
      }
      if (meeting.isCall && meeting.requestVideo && !camera) {
        dispatch(changeCamera(true));
      }
      dispatch(initMeeting({ meeting }));
    } else {
      dispatch(getMeeting({ meetingID: params.id }));
    }
  }, [meeting, meetingID]);

  useEffect(() => {
    if (producerTransport && router && meeting && meetingID === meeting._id) {
      dispatch(produce({
        cameraProducer, micProducer, camera, mic, producerTransport,
      }));
    }
  }, [camera, mic, cameraProducer, micProducer, router, meeting, meetingID, producerTransport]);

  useEffect(() => {
    if (consumerTransport && router && meeting && meetingID === meeting._id) {
      dispatch(consume({
        producers, consumerTransport,
      }));
    }
  }, [producers, consumerTransport, router, meeting, meetingID]);

  if (meetingID !== params.id) {
    return null;
  }

  if (Object.keys(producers).length === 0) {
    return null;
  }

  const users = {};
  const sessions = {};

  const streams = Object.keys(producers).map(key => {
    const producer = producers[key];

    if (!users[producer.userId]) {
      users[producer.userId] = [];
    }

    users[producer.userId].push(producer);

    if (!sessions[producer.sessionId]) {
      sessions[producer.sessionId] = [];
    }

    sessions[producer.sessionId].push(producer);

    if (!producer.stream || producer.kind !== 'video') {
      return null;
    }

    return (
      <Box>
        <Video producer={producer} />
      </Box>
    );
  }).filter(e => e !== null);

  const audios = Object.keys(producers).map(key => {
    const producer = producers[key];

    if (!producer.stream || producer.kind !== 'audio') {
      return null;
    }

    return (
      <Audio producer={producer} />
    );
  }).filter(e => e !== null);

  console.log('render users', users);

  const sessionsLength = Object.keys(sessions).length || 1;

  const width = Math.ceil(Math.sqrt(sessionsLength)) || 1;
  const height = Math.ceil(sessionsLength / width) || 1;
  const last = (width * height) - sessionsLength + 1;

  console.log('width', width);
  console.log('height', height);
  console.log('last', last);

  return (
    <>
      <Box display="grid" gridTemplateColumns={`repeat(${width}, 1fr)`} gridTemplateRows={`repeat(${height}, ${100/height}%)`} style={{ height: '100%', minHeight: '100%', maxHeight: '100%', overflow: 'hidden' }}>
        {streams}
      </Box>
      {audios}
    </>
  );
};

export default MeetingView;
