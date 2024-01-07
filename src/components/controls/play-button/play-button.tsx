import { useNavigate, useLocation } from 'react-router-dom';
import { PlayButtonProps } from '../../../types/types';
import { AppRoutes } from '../../../consts';

function PlayButton({ filmId }: PlayButtonProps){
  const navigate = useNavigate();
  const location = useLocation();

  const handlePlayBtnClick = () => {
    if (filmId !== undefined) {
      if (location.pathname === AppRoutes.Main) {
        navigate(`/${AppRoutes.Player.split('/')[1]}/${filmId}`);
      } else {
        navigate(`../${AppRoutes.Player.split('/')[1]}/${filmId}`);
      }
    } else {
      navigate(AppRoutes.NotFound);
    }
  };

  return (
    <button
      className="btn btn--play film-card__button"
      type="button"
      onClick={handlePlayBtnClick}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayButton;
