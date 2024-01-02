import { createReducer } from '@reduxjs/toolkit';
import { Film, FullFilm } from '../../types';
import { fetchFullFilmAction, fetchSimilarFilmsAction} from '../api-actions/api-film-actions';


export type StateType = {
  film: FullFilm | null;
  similarFilms: Film[];
  isFilmDataLoading: boolean;
  isSimilarFilmsLoading: boolean;
};

const initialState: StateType = {
  similarFilms: [],
  film: null,
  isFilmDataLoading: false,
  isSimilarFilmsLoading: false,
};

const fullFilmReducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(fetchFullFilmAction.pending, (state) =>{
      state.isFilmDataLoading = true;
    })

    .addCase(fetchFullFilmAction.fulfilled, (state,action) =>{
      state.isFilmDataLoading = false;
      state.film = action.payload;
    })

    .addCase(fetchFullFilmAction.rejected, (state) =>{
      state.isFilmDataLoading = false;
    })

    .addCase(fetchSimilarFilmsAction.pending, (state) =>{
      state.isFilmDataLoading = true;
    })

    .addCase(fetchSimilarFilmsAction.fulfilled, (state,action) =>{
      state.isFilmDataLoading = false;
      state.similarFilms = action.payload;
    })

    .addCase(fetchSimilarFilmsAction.rejected, (state) =>{
      state.isFilmDataLoading = false;
    });
});

export {fullFilmReducer};
