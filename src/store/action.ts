import { createAction } from '@reduxjs/toolkit';
import { AppRoutes } from '../consts';

export const redirectToRoute = createAction<AppRoutes | string>('REDIRECT/redirectToRoute');

