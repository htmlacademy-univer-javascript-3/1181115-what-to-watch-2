import { AuthorizationStatus } from '../const.ts';
import { fetchMyFilmsAction } from '../store/api-actions/api-favorite-actions.ts';
import { useAppDispatch, useAppSelector } from './index.ts';
import { useEffect } from 'react';


export function useMyFilms() {
  const { myFilms } = useAppSelector((state) => state.favorites);
  const { authorizationStatus } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchMyFilmsAction());
    }
  }, [dispatch, authorizationStatus]);

  return { myFilms };
}
