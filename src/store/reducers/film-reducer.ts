import { createReducer } from '@reduxjs/toolkit';
import { setActiveGenre, loadFilms, loadMyFilms, setFilmsDataLoadingStatus, loadPromo, loadSimilarFilmsById, loadFullFilm, setFilmLoadError, setMyFilmsLoadingStatus } from '../action';
import { Film, FullFilm, PromoFilm } from '../../types';


export type StateType = {
  genre: string;
  films: Film[];
  myFilms: Film[];
  similarFilms: Film[];
  promo: PromoFilm ;
  fullFilm: null | FullFilm;
  isDataLoading: boolean;
  isMyFilmsLoading: boolean;
  error: string | null;
};

const initialState: StateType = {
  genre: '',
  films: [],
  myFilms: [],
  similarFilms: [],
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
  isMyFilmsLoading: false,
  error: null,
};

const filmReducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(loadFilms, (state, action) =>{
      state.films = action.payload;
    })
    .addCase(loadMyFilms, (state, action) =>{
      state.myFilms = action.payload;
    })

    .addCase(loadPromo, (state, action)=>{
      state.promo = action.payload;
    })
    .addCase(loadFullFilm, (state, action) =>{
      state.fullFilm = action.payload;
    })

    .addCase(loadSimilarFilmsById, (state, action) =>{
      state.similarFilms = action.payload;
    })

    .addCase(setFilmsDataLoadingStatus, (state, action) =>{
      state.isDataLoading = action.payload;
    })

    .addCase(setMyFilmsLoadingStatus, (state, action) =>{
      state.isMyFilmsLoading = action.payload;
    })

    .addCase(setActiveGenre,(state, action) => {
      state.genre = action.payload;
    })

    .addCase(setFilmLoadError, (state, action) =>{
      state.error = action.payload;
    });

});

export {filmReducer};
