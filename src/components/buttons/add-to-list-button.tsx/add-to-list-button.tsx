import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { changeMyFilmsAction, fetchMyFilmsAction } from '../../../store/api-actions/api-film-actions';
import { useLocation } from 'react-router-dom';


function AddToListButton(): JSX.Element |null{
  const myFilms = useAppSelector((state)=>state.films.myFilms);
  const isMyFilmsLoading = useAppSelector((state)=>state.films.isMyFilmsLoading);
  const propmoFilmId = useAppSelector((state)=>state.films.promo.id);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const currentFilmId = (location.pathname === '/')
    ? propmoFilmId
    : location.pathname.slice(7);

  const isFilmAdded = myFilms.some((film)=>film.id === currentFilmId);
  const [filmAdded] = useState(isFilmAdded);

  useEffect(()=>{
    dispatch(fetchMyFilmsAction());
  },[]); // запрашивать после оправки post и менять filmAdded

  const handleButtonClick = () => {
    dispatch(changeMyFilmsAction({
      id: currentFilmId,
      filmStatus: Number(filmAdded),
    }));
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
          filmAdded ?
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
        <span className="film-card__count">{myFilms.length}</span>
      </button>
  );
}

export default AddToListButton;
