import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api/api';
import { userReducer } from './reducers/user-reducer';
import { filmReducer } from './reducers/film-reducer';
import { reviewReducer } from './reducers/review-reducer';


const api = createAPI();

const reducer = {
  films: filmReducer,
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
