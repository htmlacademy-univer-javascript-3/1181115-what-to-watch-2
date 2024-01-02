import { createReducer } from '@reduxjs/toolkit';
import { Film } from '../../types';
import { fetchMyFilmsAction } from '../api-actions/api-favorite-actions';


export type StateType = {
  myFilms: Film[];
  isMyFilmsLoading: boolean;
};

const initialState: StateType = {
  myFilms: [],
  isMyFilmsLoading: false,
};

const favoritesReducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(fetchMyFilmsAction.pending, (state) =>{
      state.isMyFilmsLoading = true;
    })

    .addCase(fetchMyFilmsAction.fulfilled, (state, action) =>{
      state.isMyFilmsLoading = false;
      state.myFilms = action.payload;
    })

    .addCase(fetchMyFilmsAction.rejected, (state) =>{
      state.isMyFilmsLoading = false;
    });

});

export {favoritesReducer};
