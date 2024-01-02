import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncActionConfig, Film, FullFilm } from '../../types';
import { APIRoute } from '../../const';


export const fetchMyFilmsAction = createAsyncThunk <Film[], undefined, AsyncActionConfig >(
  'data/fetchMyFilms',
  async(_arg, { extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.MyFilms);
    return(data);
  },
);

export const changeFilmStatusAction = createAsyncThunk <FullFilm, {
  id: string;
  status: 0 | 1;
}, AsyncActionConfig >(
  'favorite/changeStatus',
  async({id, status}, { extra: api}) => {
    const {data} = await api.post<FullFilm>(APIRoute.ChangeFilmStatus.replace(':id', id).replace(':status', status.toString()));
    return data;
  },
);


