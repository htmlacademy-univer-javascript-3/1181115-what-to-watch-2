import { createReducer } from '@reduxjs/toolkit';
import { setActiveGenre } from '../action';
import { Film, FullFilm, PromoFilm } from '../../types';
import { fetchFilmsAction, fetchPromoAction } from '../api-actions/api-films-actions';


export type StateType = {
  genre: string;
  films: Film[];
  promo: PromoFilm ;
  fullFilm: null | FullFilm;
  isDataLoading: boolean;
};

const initialState: StateType = {
  genre: '',
  films: [],
  promo: {
    id: '',
    name: '',
    posterImage: '',
    backgroundImage: '',
    videoLink: '',
    genre: '',
    released: 0,
    isFavorite: false,
  },
  fullFilm: null,
  isDataLoading: false,
};

const filmsReducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(fetchFilmsAction.pending, (state) =>{
      state.isDataLoading = true;
    })

    .addCase(fetchFilmsAction.fulfilled, (state, action) =>{
      state.isDataLoading = false;
      state.films = action.payload;
    })

    .addCase(fetchFilmsAction.rejected, (state) =>{
      state.isDataLoading = false;
    })

    .addCase(fetchPromoAction.fulfilled, (state, action)=>{
      state.promo = action.payload;
    })

    .addCase(setActiveGenre,(state, action) => {
      state.genre = action.payload;
    });

});

export {filmsReducer};
