import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { changeFilmStatusAction } from '../../../store/api-actions/api-films-actions';
import { AuthorizationStatus } from '../../../const';
import { fetchMyFilmsAction } from '../../../store/api-actions/api-favorite-actions';


type AddButtonProps = {
  listLength: number;
};

function AddToListButton({listLength}:AddButtonProps): JSX.Element |null{
  const myFilms = useAppSelector((state)=>state.favorites.myFilms);
  const isMyFilmsLoading = useAppSelector((state)=>state.favorites.isMyFilmsLoading);
  const propmoFilmId = useAppSelector((state)=>state.films.promo.id);
  const authStatus = useAppSelector((state)=>state.user.authorizationStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();

  const currentFilmId = (location.pathname === '/')
    ? propmoFilmId
    : id ;

  const isFilmAdded = myFilms.some((film)=>film.id === currentFilmId);


  const handleButtonClick = () => {
    if (currentFilmId && isAuth){
      dispatch(changeFilmStatusAction({
        id: currentFilmId,
        status: isFilmAdded ? 0 : 1,
      }))
        .then(() => dispatch(fetchMyFilmsAction()));
    }
  };


  return (
    (isMyFilmsLoading) ?
      null
      :
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={handleButtonClick}
      >
        {
          isFilmAdded ?
            (
              <svg viewBox="0 0 18 14" width="18" height="14">
                <use xlinkHref="#in-list"></use>
              </svg>
            )
            :
            (
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
            )
        }

        <span>My list</span>
        <span className="film-card__count">{listLength}</span>
      </button>
  );
}

export default AddToListButton;
