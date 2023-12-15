import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './../state';
import { Film, PromoFilm } from '../../types';
import { APIRoute } from '../../const';
import { loadFilms, loadPromo, setFilmsDataLoadingStatus } from './../action';


export const fetchFilmsAction = createAsyncThunk <void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchFilms',
    async(_arg, {dispatch, extra: api}) => {
      dispatch(setFilmsDataLoadingStatus(true));

      const {data} = await api.get<Film[]>(APIRoute.Films);

      dispatch(setFilmsDataLoadingStatus(false));
      dispatch(loadFilms(data));
    },
  );


export const fetchPromoAction = createAsyncThunk <void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));

    const {data} = await api.get<PromoFilm>(APIRoute.PromoFilm);

    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadPromo(data));
  },
);


export const fetchMyFilmsAction = createAsyncThunk <void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchMyFilms',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));

    const {data} = await api.get<Film[]>(APIRoute.MyFilms);

    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilms(data));
  },
);
