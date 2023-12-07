import {createAction} from '@reduxjs/toolkit';
import { Film} from '../types';


export const setActiveGenre = createAction<string>('genre/setActiveGenre');

export const setFilms = createAction<Film[]>('genre/setFilms');
