import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { VedioData } from './VedioData';

const VideoPlayer = ({ playlist }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const currentVideo = VedioData.categories[0].videos[currentVideoIndex];
console.log(currentVideo)
  const handlePlayPauseToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
  };

  const handleProgress = (state) => {
    if (!isPlaying) {
      setCurrentTime(state.playedSeconds);
    }
  };

  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  const handleSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    console.log(speed)
    setPlaybackSpeed(speed);
  };

  const handleVideoEnded = () => {
    if (autoplay && currentVideoIndex < (VedioData.categories[0].videos).length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  }; const handleFullScreen = () => {
    if (playerRef.current) {
      playerRef.current.wrapper.requestFullscreen();
    }
  };
 

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={currentVideo.sources[0]}
        playing={isPlaying}
        controls
        width="100%"
        height="auto"
        onProgress={handleProgress}
        onEnded={handleVideoEnded}
        playbackRate={playbackSpeed}
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
      />
      <div>
        <button onClick={handlePlayPauseToggle}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min={0}
          max={currentVideo.duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{currentVideo.title}
        </span>
        <span> { currentTime}</span>
        <label>
          Autoplay
          <input type="checkbox" checked={autoplay} onChange={handleAutoplayToggle} />
        </label>
        <label>
          Playback Speed:
          <select value={playbackSpeed} onChange={handleSpeedChange}>
          <option value={0.5}>0.5x</option>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </label>
      </div>
      <button onClick={()=>setCurrentVideoIndex(currentVideoIndex+1)}> next</button>
      <button onClick={handleFullScreen}>Fullscreen</button>
    </div>
  );
};

export default VideoPlayer;
