import { createReducer } from '@reduxjs/toolkit';
import { setFilms, setActiveGenre } from './action';
import { Film } from '../types';


export type StateType = {
  genre: string;
  films: Film[];
};

const initialState: StateType = {
  genre: '',
  films: [],
};

const reducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(setActiveGenre,(state, action) => {
      state.genre = action.payload;
    })

    .addCase(setFilms,(state, action) => {
      state.films = action.payload;
    });
});

export {reducer};
