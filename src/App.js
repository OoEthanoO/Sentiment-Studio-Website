import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [menu, setMenu] = useState('main');
  const videoRef = useRef(null);

  const handleClick = () => {
    setMenu('emoti');
  };

  return (
    menu === 'main' ? <Menu onClick={handleClick} /> : <Emoti videoRef={videoRef} />
  );
}

function Emoti({ videoRef }) {
  console.log('Emoti component rendered');
  console.log('videoRef: ', videoRef);

  const canvasRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log('Video stream set successfully');
        } else {
          console.log('videoRef.current is still null');
        }
      })
      .catch(err => {
        console.error(err);
        console.log('Failed to set video stream');
      });
    } else {
      console.log('useEffect conditions not met');
    }
  }, []);

  const handleSnapClick = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const dataUrl = canvas.toDataURL('image/png');

    axios.post('http://localhost:3000/video_feed', { image: dataUrl })
    .then(response => {
      const photo = photoRef.current;
      photo.setAttribute('src', response.data.image);
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <div>
      <h1 className="centered-title">Facial Emotion Recognition</h1>
      <video ref={videoRef} autoPlay={true} onLoadedMetadata={() => console.log('Video element fully initialized')}/>
      <canvas id="canvas" ref={canvasRef} style={{ display: 'none' }}></canvas>
      <img id="photo" ref={photoRef} />
      <button id="snap" onClick={handleSnapClick}>Snap</button>
    </div>
  );
}

function Menu({ onClick} ) {
  return (
    <div>
      <button onClick={onClick}>Emoti</button>
    </div>
  );
}

export default App;