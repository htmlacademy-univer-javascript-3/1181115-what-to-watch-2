import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { FilmSlice } from '../../types/state';
import { fetchFilmAction, fetchComentsAction, fetchSimilarFilmsAction, sendCommentAction } from '../api-actions';

const initialState: FilmSlice = {
  film: {
    id: '',
    name: '',
    posterImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
  comments: [],
  similarFilms: [],
  isLoading: false,
  error: undefined,
};

export const filmSlice = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.error = undefined;
      })
      .addCase(fetchFilmAction.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchComentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendCommentAction.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload);
      });
  },
});
