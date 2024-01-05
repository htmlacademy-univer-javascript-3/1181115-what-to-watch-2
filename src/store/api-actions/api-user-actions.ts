import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './../state';
import { AuthData, UserData } from '../../types';
import { APIRoute } from '../../const';
import { setAuthorizationError } from './../action';
import { dropToken, saveToken } from '../../api/token';


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  state: State;
  extra: AxiosInstance;
  }>(
    'user/checkAuth',
    async (_arg, { extra: api}) => {
      try{
        return (await api.get<UserData>(APIRoute.Login)).data;
      } catch(e) {
        dropToken();
        throw e;
      }
    }
  );


export const loginAction = createAsyncThunk<UserData, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const data = (await api.post<UserData>(APIRoute.Login, {email, password})).data;
      saveToken(data.token);
      dispatch(setAuthorizationError(''));
      return data;
    }
  );


export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
  }>(
    'user/logout',
    async (_arg, { extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
    },
  );
