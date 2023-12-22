import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch, State } from './../state';
import { ErrorType, UserComment, } from '../../types';
import { APIRoute } from '../../const';
import { loadComments, setFilmLoadError, setFilmsDataLoadingStatus } from './../action';

const DEFAULT_ERROR = 'load error';

export const fetchUsersComments = createAsyncThunk <void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchUsersComments',
    async(id, {dispatch, extra: api}) => {
      try{
        dispatch(setFilmsDataLoadingStatus(true));
        const {data} = await api.get<UserComment[]>(APIRoute.UserComments.replace(':id', id));
        dispatch(loadComments(data));

      }catch(error: unknown){
        const err = error as AxiosError;
        const data = err.response?.data as ErrorType;
        dispatch(setFilmLoadError(data.message || DEFAULT_ERROR));

      }finally{
        dispatch(setFilmsDataLoadingStatus(false));
      }
    },
  );
