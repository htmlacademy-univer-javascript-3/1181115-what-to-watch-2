import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { userSlice } from './user/user-slice';
import { filmSlice } from './film/film-slice';
import { filmsSlice } from './films/films-slice';
import { myListSlice } from './my-list/my-list-slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Films]: filmsSlice.reducer,
  [NameSpace.Film]: filmSlice.reducer,
  [NameSpace.MyList]: myListSlice.reducer,
});
