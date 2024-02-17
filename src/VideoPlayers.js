import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
// import './VideoPlayer.css'; // Import CSS file for custom styling
import { VedioData } from './VedioData';
import Navbar from './Nav_footer/Navbar'
import Footer from './Nav_footer/Footer'
import './App.css';

const VideoPlayer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

 const currentVideo = VedioData.categories[0].videos[currentVideoIndex];;
console.log(currentVideo)
  function PlayPause(){
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
    setPlaybackSpeed(speed);
  };

  const handleVideoEnded = () => {
    if (autoplay && currentVideoIndex < VedioData.categories[0].videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    }
  };

  function handleThumbnailClick (index) {
    console.log(index)
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };
   function FullScreen (){
    console.log('cvbn')
    if (playerRef.current) {
      playerRef.current.wrapper.requestFullscreen();
    }
  };
  function Pervious(){
    if(currentVideoIndex >0){
      setCurrentVideoIndex(currentVideoIndex-1)
    }
  }
  function Next(){
    if(currentVideoIndex <VedioData.categories[0].videos.length-1){
      setCurrentVideoIndex(currentVideoIndex+1)
    }
  }
  return (
    <div className="container">
      <Navbar/>
      <div className="row" style={{marginTop:'100px',marginBottom:'30px'}}>
        <div className="col-lg-9 col-md-8 col-sm-12" >
          <div className="video-player-wrapper">
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
              style={{borderRight:'50px'}}
            />
            <div className="controls">
              <button className='buttonContainer' onClick={()=>PlayPause()}>{isPlaying ? 'Pause' : 'Play'}</button>
              <input
                type="range"
                min={0}
                // max={currentVideo.duration}//
                value={currentTime}
                onChange={handleSeek}
              />
              <span>{`${currentVideo.title} - ${Math.round(currentTime)}s
              `}</span>
              <label>
                Autoplay
                <input type="checkbox" checked={autoplay} onChange={handleAutoplayToggle} />
              </label>
              <label>
                Playback Speed:
                <select value={playbackSpeed} onChange={handleSpeedChange}>
                <option value={0.25}>.25x</option>
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                  <option value={2.5}>2.5x</option>
                  <option value={3}>3x</option>
                </select>
              </label>
            </div>
            <div className="controls">
          {currentVideoIndex>0 && <button className='buttonContainer' onClick={()=>Pervious()}>Pervious</button>}  
         {currentVideoIndex < VedioData.categories[0].videos.length-1 && <button className='buttonContainer'  onClick={()=>Next()}>Next</button> }     
              <button className='buttonContainer' onClick={()=>FullScreen()}>FullScreen</button>
            
            </div>
            <div style={{ margin:'10px'}}> {currentVideo.description}</div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div className="thumbnails">
            
            {VedioData.categories[0].videos.map((video, index) => (
              <div key={index} className="thumbnail" onClick={() => handleThumbnailClick(index)}>
                <img src={'https://storage.googleapis.com/gtv-videos-bucket/sample/'+ video.thumb} alt={video.title} />
                <p>{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default VideoPlayer;
