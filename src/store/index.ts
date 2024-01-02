import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api/api';
import { userReducer } from './reducers/user-reducer';
import { fullFilmReducer } from './reducers/film-reducer';
import { reviewReducer } from './reducers/review-reducer';
import { filmsReducer } from './reducers/films-reducer';
import { favoritesReducer } from './reducers/favorite-reducer';


const api = createAPI();

const reducer = {
  films: filmsReducer,
  fullFilm: fullFilmReducer,
  favorites:favoritesReducer,
  user: userReducer,
  reviews: reviewReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })

});
