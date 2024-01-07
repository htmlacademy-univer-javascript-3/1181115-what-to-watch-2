import { useEffect, useRef } from 'react';
import { VideoPlayerProps } from '../../types/types';

function VideoPlayer({active, src, img, filmTitle, videoTimeout, width, height}:VideoPlayerProps){
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoPlayerRef.current?.load();
    if (active) {
      const timerId = setTimeout(()=> {
        videoPlayerRef.current?.play();
      }, videoTimeout);
      return () => clearTimeout(timerId);
    } else {
      if(videoPlayerRef.current !== null){
        videoPlayerRef.current.pause();
        videoPlayerRef.current.currentTime = 0;
      }
    }
  });

  return (
    active
      ? <video data-testid='video' preload='metadata' ref={videoPlayerRef} src={src} width={width} height={height} poster={img} muted loop />
      : <img src={img} alt={filmTitle} width={width} height={height} />
  );
}

export default VideoPlayer;
