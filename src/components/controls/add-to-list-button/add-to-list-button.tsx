import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddToListButtonProps } from '../../../types/types';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getCountFilmsInMyList, getFilmsInMyList } from '../../../store/my-list/selectors';
import { addFilmToFavoriteAction, removeFilmToFavoriteAction } from '../../../store/api-actions';
import { getAuthStatus } from '../../../store/user/selectors';
import { AuthorisationStatus, AppRoutes } from '../../../consts';

function AddToListButton({film}: AddToListButtonProps){
  const dispatch = useAppDispatch();
  const countFilmsInMyList = useAppSelector(getCountFilmsInMyList);
  const filmsInMyList = useAppSelector(getFilmsInMyList);
  const [isFavorite, setIsFavorite] = useState(false);
  const authorisationStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const [countFilms, setCountFilms] = useState(0);

  useEffect(() => {
    if (authorisationStatus === AuthorisationStatus.Auth) {
      setCountFilms(countFilmsInMyList);
    } else {
      setCountFilms(0);
    }
  }, [authorisationStatus, countFilmsInMyList]);

  useEffect(() => {
    const findFilmInMyList = filmsInMyList.find((filmMyList) => film.id === filmMyList.id);

    if(findFilmInMyList){
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [film.id, filmsInMyList]);

  const handleMyListBtnClick = () => {
    if (authorisationStatus === AuthorisationStatus.Auth){
      if (isFavorite === false) {
        if (film.id !== undefined) {
          dispatch(addFilmToFavoriteAction(film.id));
          setIsFavorite(true);
        }
      } else {
        dispatch(removeFilmToFavoriteAction(film.id));
        setIsFavorite(false);
      }
    } else {
      navigate(AppRoutes.Login);
      setCountFilms(0);
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleMyListBtnClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {
          isFavorite && authorisationStatus === AuthorisationStatus.Auth
            ? <use xlinkHref="#in-list"></use>
            : <use xlinkHref="#add"></use>
        }
      </svg>
      <span>My list</span>
      <span
        className="film-card__count"
        data-testid='my-list-count'
      >
        {countFilms}
      </span>
    </button>
  );
}

export default AddToListButton;
