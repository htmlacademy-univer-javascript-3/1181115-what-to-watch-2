import {createAction} from '@reduxjs/toolkit';
import { UserData} from '../types';
import { AppRoute } from '../const';


export const setActiveGenre = createAction<string>('genre/setActiveGenre');
export const redirectToRoute = createAction<AppRoute|string>('redirectToRoute');

export const setAuthLoadingStatus = createAction<boolean>('data/setAuthLoadingStatus');
export const setAuthorizationError = createAction<string | null>('user/setAuthorizationError');

export const setUserData = createAction<UserData>('user/setUserData');

export const setAuthorization = createAction<string>('user/setAuthorization');
