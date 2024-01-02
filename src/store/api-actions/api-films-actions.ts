import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncActionConfig, Film, PromoFilm } from '../../types';
import { APIRoute } from '../../const';


export const fetchFilmsAction = createAsyncThunk <Film[], undefined, AsyncActionConfig >(
  'data/fetchFilms',
  async(_arg, { extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);


export const fetchPromoAction = createAsyncThunk <PromoFilm, undefined, AsyncActionConfig>(
  'data/fetchPromo',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(APIRoute.PromoFilm);
    return data;
  },
);


export const changeFilmStatusAction = createAsyncThunk <void,
{
  id: string;
  status: 0 | 1;
},
AsyncActionConfig >(
  'favorite/changeStatus',
  async({id, status}, { extra: api}) => {
    await api.post(APIRoute.ChangeFilmStatus.replace(':id', id).replace(':status', status.toString()));
  },
);
