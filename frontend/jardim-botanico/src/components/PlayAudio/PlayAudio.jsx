import React, { useRef } from 'react';
import Play from "../../assets/svg/Play"
import './style.css'


function PlayAudio({ audio }) {
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div className={`play-audio-container ${audio ? '' : 'hide'}`} onClick={handlePlay}>
      <Play/>
      <span className='play-audio-label'>Som do animal</span>
      <audio ref={audioRef} src={`/sons/${audio}`} />
    </div>
  );
}

export default PlayAudio;