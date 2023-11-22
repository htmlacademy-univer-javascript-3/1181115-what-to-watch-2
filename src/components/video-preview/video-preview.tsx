import {useFilmPreview} from '../../hooks/useVideoPreview';


type VideoPreviewProps = {
  src: string;
  isActive: boolean;
  poster: string;
  name: string;
};

const DELAY = 1000;

function VideoPreview(props: VideoPreviewProps): JSX.Element {
  const isVideoPlaying = useFilmPreview(props.isActive, DELAY);

  return (
    isVideoPlaying ?
      <video src={props.src} poster={props.poster} className="player__video" muted autoPlay />
      :
      <img src={props.poster} alt={props.name} width="280" height="175" />
  );
}

export default VideoPreview;
