import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import {
  FilmCardProps,
  PromoFilm,
  UserData,
  AuthData,
  FullFilm,
  UserComment,
  SentComment
} from '../types/types';
import { APIRoute, AppRoutes, FavoriteFilmStatus } from '../consts';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';

export const fetchFilmsAction = createAsyncThunk<FilmCardProps[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'FILMS/fetchFilms',
  async (_arg, { extra: api }) => {
    const {data} = await api.get<FilmCardProps[]>(APIRoute.Films);
    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'FILMS/fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PromoFilm>(APIRoute.Promo);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'USER/login',
  async ({ login, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email: login,
      password
    });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoutes.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'USER/logout',
  async (_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchFilmAction = createAsyncThunk<FullFilm, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'FILM/fetchFilm',
  async (id, { extra: api }) => {
    const { data } = await api.get<FullFilm>(`${APIRoute.Films}/${id}`);
    return data;
  }
);

export const fetchComentsAction = createAsyncThunk<UserComment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'FILM/fetchComment',
  async (id, { extra: api }) => {
    const { data } = await api.get<UserComment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const fetchSimilarFilmsAction = createAsyncThunk<FilmCardProps[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'FILM/fetchSimilarFilms',
  async (id, { extra: api }) => {
    const {data} = await api.get<FilmCardProps[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  }
);

export const sendCommentAction = createAsyncThunk<UserComment, SentComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'FILM/sendComment',
  async ({id, comment, rating}, { dispatch, extra: api}) => {
    const { data } = await api.post<UserComment>(`${APIRoute.Comments}/${id}`, {
      comment,
      rating
    });

    dispatch(redirectToRoute(`/films/${id}`));

    return data;
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<FilmCardProps[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'MY_LIST/fetchFavoriteFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FilmCardProps[]>(APIRoute.Favorite);
    return data;
  }
);

export const addFilmToFavoriteAction = createAsyncThunk<FilmCardProps, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'MY_LIST/addFilmToFavorite',
  async (id, { extra: api}) => {
    const { data } = await api.post<FilmCardProps>(`${APIRoute.Favorite}/${id}/${FavoriteFilmStatus.AddToFavorite}`);
    return data;
  },
);

export const removeFilmToFavoriteAction = createAsyncThunk<FilmCardProps, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'MY_LIST/removeFilmToFavorite',
  async (id, { extra: api}) => {
    const { data } = await api.post<FilmCardProps>(`${APIRoute.Favorite}/${id}/${FavoriteFilmStatus.RemoveFromFavorite}`);
    return data;
  },
);

export const verifyToken = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'USER/verifyToken',
  async (_arg, { extra: api }) => {
    try {
      return (await api.get<UserData>(APIRoute.Login)).data;
    } catch (e) {
      dropToken();
      throw e;
    }
  }
);
