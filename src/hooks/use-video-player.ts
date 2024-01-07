import { useEffect, useState, useCallback } from 'react';
import { VideoPlayerConsts } from '../consts';

const useVideoPlayer = (videoPlayer: React.RefObject<HTMLVideoElement>) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isFullscreen: false,
    progress: 0,
    remainDuration: 0,
  });

  useEffect(() => {
    if (playerState.isPlaying) {
      videoPlayer.current?.play();
    } else {
      videoPlayer.current?.pause();
    }
  }, [playerState.isPlaying, videoPlayer]);

  const calcProgress = useCallback((currentTime: number, duration: number): number => (
    (currentTime / duration) * VideoPlayerConsts.MaxProgressValue
  ), []);

  useEffect(() => {
    if (videoPlayer.current) {
      const progress = calcProgress(videoPlayer.current?.currentTime, videoPlayer.current?.duration);
      setPlayerState({
        ...playerState,
        progress,
      });
    }
  }, [playerState.remainDuration]);

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });
  };

  const handleVideoOnTimeUpdate = () => {
    if (videoPlayer.current) {
      const remainDuration = videoPlayer.current.duration - videoPlayer.current.currentTime;
      const progress = calcProgress(videoPlayer.current?.currentTime, videoPlayer.current?.duration);

      setPlayerState({
        ...playerState,
        remainDuration,
        progress
      });
    }
  };

  const toggleFullscreen = () => {
    videoPlayer.current?.requestFullscreen();

    setPlayerState({
      ...playerState,
      isFullscreen: !playerState.isFullscreen
    });
  };

  const handleVideoOnEnded = () => {
    setPlayerState({
      ...playerState,
      progress: 0,
      isPlaying: false
    });
  };

  return {
    playerState,
    togglePlay,
    handleVideoOnTimeUpdate,
    toggleFullscreen,
    handleVideoOnEnded,
    setPlayerState
  };
};

export default useVideoPlayer;
