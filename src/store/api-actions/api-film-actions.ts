import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncActionConfig, Film, FullFilm } from '../../types';
import { APIRoute } from '../../const';


export const fetchFullFilmAction = createAsyncThunk <FullFilm , string, AsyncActionConfig >(
  'film/fetchFullFilm',
  async(id,{ extra: api }) => {
    const {data} = await api.get<FullFilm>(APIRoute.FullFilm.replace(':id', id));

    return data;
  },
);


export const fetchSimilarFilmsAction = createAsyncThunk <Film[], string, AsyncActionConfig >(
  'film/fetchSimilarFilms',
  async (id, { extra: api }) => {
    const {data} = await api.get<Film[]>(APIRoute.SimilarFilms.replace(':id', id));

    return data;
  },
);

