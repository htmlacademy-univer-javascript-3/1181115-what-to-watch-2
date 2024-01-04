import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api/api';
import { NameSpace } from '../const';
import { filmsSlice } from './slices/films-slice';
import { fullFilmSlice } from './slices/film-slice';
import { favoritesSlice } from './slices/favorites-slice';
import { userSlice } from './slices/user-slice';
import { reviewSlice } from './slices/review-slice';


const api = createAPI();

const reducer = combineReducers({
  [NameSpace.Films]: filmsSlice.reducer,
  [NameSpace.Film]: fullFilmSlice.reducer,
  [NameSpace.MyFilms]: favoritesSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })

});
