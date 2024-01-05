import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncActionConfig, Film, PromoFilm } from '../../types';
import { APIRoute } from '../../const';


export const fetchFilmsAction = createAsyncThunk <Film[], undefined, AsyncActionConfig >(
  'films/fetchFilms',
  async(_arg, { extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);


export const fetchPromoAction = createAsyncThunk <PromoFilm, undefined, AsyncActionConfig>(
  'films/fetchPromo',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(APIRoute.PromoFilm);
    return data;
  },
);
