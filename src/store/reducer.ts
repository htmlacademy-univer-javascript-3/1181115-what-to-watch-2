import { createReducer } from '@reduxjs/toolkit';
import { setFilms, setActiveGenre, loadFilms, setFilmsDataLoadingStatus, loadPromo } from './action';
import { Film, PromoFilm } from '../types';


export type StateType = {
  genre: string;
  films: Film[];
  promo: PromoFilm ;
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
  isDataLoading: false,
};

const reducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(loadFilms, (state, action) =>{
      state.films = action.payload;
    })
    .addCase(loadPromo, (state, action)=>{
      state.promo = action.payload;
    })

    .addCase(setFilmsDataLoadingStatus, (state, action) =>{
      state.isDataLoading = action.payload;
    })

    .addCase(setActiveGenre,(state, action) => {
      state.genre = action.payload;
    })

    .addCase(setFilms,(state, action) => {
      state.films = action.payload;
    });
});

export {reducer};
