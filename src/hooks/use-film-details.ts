import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './index.ts';
import { useEffect } from 'react';
import { fetchFullFilmAction } from '../store/api-actions/api-film-actions.ts';
import { ErrorType } from '../types.ts';
import { NOT_FOUND_MESSAGE } from '../api/const.ts';
import { AppRoute } from '../const.ts';
import { getCurrentFilm } from '../store/selectors/film-selector.ts';


export function useFilmDetails() {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getCurrentFilm);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFullFilmAction(id))
      .unwrap()
      .catch((error: ErrorType) => {
        if (error?.message === NOT_FOUND_MESSAGE) {
          navigate(AppRoute.NotFound);
        }
      });
  }, [dispatch, id, navigate]);

  return { film };
}
