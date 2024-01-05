import {createAction} from '@reduxjs/toolkit';
import { AppRoute } from '../const';


export const redirectToRoute = createAction<AppRoute|string>('redirectToRoute');

export const setAuthLoadingStatus = createAction<boolean>('user/setAuthLoadingStatus');
export const setAuthorizationError = createAction<string | null>('user/setAuthorizationError');
