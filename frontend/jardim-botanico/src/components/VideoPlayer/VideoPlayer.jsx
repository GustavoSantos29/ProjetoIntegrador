import React from 'react';
import Play from "../../assets/svg/Play";
import './style.css';

function PlayVideo({ url }) {
  if (!url) return null;

  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      let videoId = '';

      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v');
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0` : null;
    } catch {
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="play-video-container">
      <iframe
        className="play-video-iframe"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default PlayVideo;
