import { AuthorizationStatus } from '../const.ts';
import { fetchMyFilmsAction } from '../store/api-actions/api-favorite-actions.ts';
import { getMyFilms } from '../store/selectors/favorite-selector.ts';
import { getIsAuth } from '../store/selectors/user-selector.ts';
import { useAppDispatch, useAppSelector } from './index.ts';
import { useEffect } from 'react';


export function useMyFilms() {
  const myFilms = useAppSelector(getMyFilms);
  const authorizationStatus = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchMyFilmsAction());
    }
  }, [dispatch, authorizationStatus]);

  return { myFilms };
}
