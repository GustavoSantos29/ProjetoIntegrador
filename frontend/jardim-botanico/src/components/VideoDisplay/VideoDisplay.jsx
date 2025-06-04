import React from 'react';
import './style.css'

const VideoDisplay = ({ link }) => {
    if (!link) return null;
  
    const getYoutubeEmbedUrl = (url) => {
      const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
      const match = url.match(regex);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
      return null;
    };
  
    const embedUrl = getYoutubeEmbedUrl(link);
  
    if (!embedUrl) return null;
  
    return (
        <div className="video-wrapper">
            
        <div className="video-frame">
          <iframe
            className="youtube-iframe"
            src={embedUrl}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default VideoDisplay;