import { useEffect, useRef, SyntheticEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppRoutes, VideoPlayerConsts } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmInfo } from '../../store/film/selectors';
import useVideoPlayer from '../../hooks/use-video-player';
import { changeVideoTimeFormat } from '../../utils/functions/change-video-time-format/change-video-time-format';
import { fetchFilmAction } from '../../store/api-actions';

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const film = useAppSelector(getFilmInfo);
  const {
    playerState,
    setPlayerState,
    togglePlay,
    handleVideoOnTimeUpdate,
    toggleFullscreen,
    handleVideoOnEnded,
  } = useVideoPlayer(videoPlayerRef);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchFilmAction(id));
    } else {
      navigate(AppRoutes.NotFound);
    }
  }, [id, dispatch, navigate]);

  const handleVideoOnLoad = (e: SyntheticEvent<HTMLVideoElement>) => {
    setPlayerState({
      ...playerState,
      remainDuration: e.currentTarget.duration,
    });
  };

  const handleExitBtnClick = () => {
    navigate(AppRoutes.Film.replace(':id', film.id));
  };

  const timeObject = changeVideoTimeFormat(playerState.remainDuration);

  return (
    <div className="player">
      <video
        className="player__video"
        ref={videoPlayerRef}
        src={film.videoLink}
        poster={film.backgroundImage}
        preload="metadata"
        onTimeUpdate={handleVideoOnTimeUpdate}
        onClick={togglePlay}
        onEnded={handleVideoOnEnded}
        onLoadedMetadata={handleVideoOnLoad}
        data-testid="video-player"
      />

      <button
        type="button"
        className="player__exit"
        onClick={handleExitBtnClick}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={
                !Number.isNaN(playerState.progress) ? playerState.progress : 0
              }
              max={VideoPlayerConsts.MaxProgressValue}
            />
            <div
              className="player__toggler"
              style={{ left: `${playerState.progress}%` }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">
            {!playerState.isPlaying &&
              playerState.progress === VideoPlayerConsts.MinProgressValue &&
              timeObject?.time.replace('-', '')}
            {playerState.isPlaying ||
            (playerState.progress !== VideoPlayerConsts.MaxProgressValue &&
              playerState.progress !== VideoPlayerConsts.MinProgressValue)
              ? timeObject?.time
              : null}
            {playerState.progress === VideoPlayerConsts.MaxProgressValue &&
              timeObject.timeFormated}
          </div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={togglePlay}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              {playerState.isPlaying ? (
                <use xlinkHref="#pause"></use>
              ) : (
                <use xlinkHref="#play-s"></use>
              )}
            </svg>
            <span>{playerState.isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={toggleFullscreen}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
