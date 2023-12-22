import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch, State } from './../state';
import { ErrorType, Film, FullFilm, PromoFilm } from '../../types';
import { APIRoute } from '../../const';
import { loadFilms, loadFullFilm, loadMyFilms, loadPromo, loadSimilarFilmsById, setFilmLoadError, setFilmsDataLoadingStatus, setMyFilmsLoadingStatus } from './../action';

const DEFAULT_ERROR = 'load error';

export const fetchFilmsAction = createAsyncThunk <void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchFilms',
    async(_arg, {dispatch, extra: api}) => {
      try{
        dispatch(setFilmsDataLoadingStatus(true));
        const {data} = await api.get<Film[]>(APIRoute.Films);
        dispatch(loadFilms(data));

      }catch(error: unknown){
        const err = error as AxiosError;
        const data = err.response?.data as ErrorType;
        dispatch(setFilmLoadError(data.message || DEFAULT_ERROR));

      }finally{
        dispatch(setFilmsDataLoadingStatus(false));
      }
    },
  );


export const fetchPromoAction = createAsyncThunk <void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async(_arg, {dispatch, extra: api}) => {

    try{
      dispatch(setFilmsDataLoadingStatus(true));
      const {data} = await api.get<PromoFilm>(APIRoute.PromoFilm);
      dispatch(loadPromo(data));

    } catch(error: unknown){
      const err = error as AxiosError;
      const data = err.response?.data as ErrorType;
      dispatch(setFilmLoadError(data.message || DEFAULT_ERROR));

    } finally{
      dispatch(setFilmsDataLoadingStatus(false));
    }

  },
);

export const fetchFullFilmAction = createAsyncThunk <void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFullFilm',
  async(id, {dispatch, extra: api}) => {
    try {
      dispatch(setFilmsDataLoadingStatus(true));
      const {data} = await api.get<FullFilm>(APIRoute.FullFilm.replace(':id', id));
      dispatch(loadFullFilm(data));

    } catch(error: unknown) {
      const err = error as AxiosError;
      const data = err.response?.data as ErrorType;
      dispatch(setFilmLoadError(data.message || DEFAULT_ERROR));

    } finally {
      dispatch(setFilmsDataLoadingStatus(false));
    }
  },
);


export const fetchMyFilmsAction = createAsyncThunk <void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchMyFilms',
  async(_arg, {dispatch, extra: api}) => {
    try{
      dispatch(setMyFilmsLoadingStatus(true));
      const {data} = await api.get<Film[]>(APIRoute.MyFilms);
      dispatch(loadMyFilms(data));

    } catch(error: unknown) {
      const err = error as AxiosError;
      const data = err.response?.data as ErrorType;
      dispatch(setFilmLoadError(data.message || DEFAULT_ERROR));

    }finally{
      dispatch(setMyFilmsLoadingStatus(false));
    }
  },
);

export const changeMyFilmsAction = createAsyncThunk <void,
{
  id: string;
  filmStatus: number;
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeMyFilms',
  async({id, filmStatus}, {dispatch, extra: api}) => {

    try{
      dispatch(setMyFilmsLoadingStatus(true));
      const route = APIRoute.ChangeFilmStatus.replace(':id', id).replace(':status', filmStatus.toString());

      await api.post<FullFilm>(route);

    } catch(error: unknown) {
      const err = error as AxiosError;
      const data = err.response?.data as ErrorType;
      dispatch(setFilmLoadError(data.message || DEFAULT_ERROR));

    }finally{
      dispatch(setMyFilmsLoadingStatus(false));
    }
  },
);


export const fetchSimilarFilmsAction = createAsyncThunk <void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (id, { dispatch, extra: api}) => {
    try{
      dispatch(setFilmsDataLoadingStatus(true));
      const {data} = await api.get<Film[]>(APIRoute.SimilarFilms.replace(':id', id));
      dispatch(loadSimilarFilmsById(data));

    } catch(error: unknown) {
      const err = error as AxiosError;
      const data = err.response?.data as ErrorType;
      dispatch(setFilmLoadError(data.message || DEFAULT_ERROR));

    }finally{
      dispatch(setFilmsDataLoadingStatus(false));
    }

  },
);
