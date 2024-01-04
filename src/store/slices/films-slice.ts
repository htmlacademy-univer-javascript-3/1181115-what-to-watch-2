import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Film, FullFilm, PromoFilm } from '../../types';
import { fetchFilmsAction, fetchPromoAction } from '../api-actions/api-films-actions';
import { NameSpace } from '../../const';


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

export const filmsSlice = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setActiveGenre: (state, action:PayloadAction<string>) => {
      state.genre = action.payload;
    }
  },
  extraReducers(builder) {
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
      });
  }
});


export const {setActiveGenre} = filmsSlice.actions;
