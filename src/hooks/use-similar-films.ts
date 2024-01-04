import { fetchSimilarFilmsAction } from '../store/api-actions/api-film-actions.ts';
import { getCurrentFilm, getSimilarFilms } from '../store/selectors/film-selector.ts';
import { useAppDispatch, useAppSelector } from './index.ts';
import { useEffect } from 'react';


export function useSimilarFilms() {
  const list = useAppSelector(getSimilarFilms);
  const id = useAppSelector(getCurrentFilm)?.id;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarFilmsAction(id));
    }
  }, [dispatch, id]);

  return {list};
}
