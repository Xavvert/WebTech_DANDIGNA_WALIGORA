import React, { useState } from 'react';
import Sound from 'react-sound'
import Stellardon from './Music/Stellardon.mp3'
import Button from '@mui/material/Button';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { ReactComponent as MusicIcon } from './icons/music.svg';


const PlaySound = (
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying
  ) => {
      const [isPlaying, setIsPlaying] = useState(false);
      return (
          <div>
              <Button 
              style={{cursor:"pointer", textAlign: 'center', fontSize: '20px', color: "white", display : 'flex', 
              float :'right', marginTop: "-29px", height: '30px', width : '30px'}} 
              onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? '🔊' : '🔇'}</Button>
          <Sound
           url={Stellardon}
           playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
        playFromPosition={300}
           onLoading={handleSongLoading}
           onPlaying={handleSongPlaying}
           onFinishedPlaying={handleSongFinishedPlaying}
          />
          </div>
      );
  };

  export default PlaySound;