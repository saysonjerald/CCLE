import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffSharpIcon from '@mui/icons-material/VideocamOffSharp';

const VideoButtons = ({ myStream }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const muteMic = async (myStream) => {
    await myStream
      .getAudioTracks()
      .forEach((track) => (track.enable = !track.enable))
      .then(() => {
        setIsMuted(!isMuted);
      });
  };

  console.log('Hello from the clinet');
  return (
    <>
      <Fab
        style={
          isMuted
            ? { backgroundColor: '#F5F5F5', marginLeft: '10px' }
            : { backgroundColor: '#EA5044', marginLeft: '10px' }
        }
        aria-label="microphone"
        onClick={() => {
          muteMic(myStream);
        }}
      >
        {isMuted ? <MicIcon /> : <MicOffIcon />}
      </Fab>
      <Fab
        style={
          isCameraOn
            ? { backgroundColor: '#F5F5F5', marginLeft: '10px' }
            : { backgroundColor: '#EA5044', marginLeft: '10px' }
        }
        aria-label="camera"
        onClick={() => {
          setIsCameraOn(!isCameraOn);
        }}
      >
        {isCameraOn ? <VideocamIcon /> : <VideocamOffSharpIcon />}
      </Fab>
    </>
  );
};

export default VideoButtons;
