import { createSlice } from '@reduxjs/toolkit';
import { Film } from '../../types';
import { fetchMyFilmsAction } from '../api-actions/api-favorite-actions';
import { NameSpace } from '../../const';


export type StateType = {
  myFilms: Film[];
  isMyFilmsLoading: boolean;
};

const initialState: StateType = {
  myFilms: [],
  isMyFilmsLoading: false,
};

export const favoritesSlice = createSlice({
  name: NameSpace.MyFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
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
  }
});

