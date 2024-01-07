import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { MyListSlice } from '../../types/state';
import { fetchFavoriteFilmsAction, addFilmToFavoriteAction, removeFilmToFavoriteAction } from '../api-actions';

const initialState: MyListSlice = {
  countFilmsInMyList: 0,
  filmsInMyList: [],
  isLoading: false,
};

export const myListSlice = createSlice({
  name: NameSpace.MyList,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.filmsInMyList = action.payload;
        state.countFilmsInMyList = state.filmsInMyList.length;
        state.isLoading = false;
      })
      .addCase(addFilmToFavoriteAction.fulfilled, (state, action) => {
        state.filmsInMyList.push(action.payload);
        state.countFilmsInMyList += 1;
      })
      .addCase(removeFilmToFavoriteAction.fulfilled, (state, action) => {
        state.filmsInMyList = state.filmsInMyList.filter((film) => film.id !== action.payload.id);
        state.countFilmsInMyList -= 1;
      });
  },
});
