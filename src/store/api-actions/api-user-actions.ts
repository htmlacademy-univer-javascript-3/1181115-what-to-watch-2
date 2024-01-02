import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch, State } from './../state';
import { AuthData, UserData } from '../../types';
import { APIRoute, AuthorizationStatus} from '../../const';
import { setAuthLoadingStatus, setAuthorization, setAuthorizationError, setUserData } from './../action';
import { dropToken, saveToken } from '../../api/token';


const NOT_VERIFIED_CODE = 401;
const NOT_VERIFIED_TEXT = 'We can’t recognize this email and password combination. Please try again.';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setAuthLoadingStatus(true));
      try {
        await api.get(APIRoute.Login);
        dispatch(setAuthorization(AuthorizationStatus.Auth));

      } catch {
        dispatch(setAuthorization(AuthorizationStatus.NoAuth));

      } finally{
        dispatch(setAuthLoadingStatus(false));
      }
    },
  );


export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      try {
        const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
        saveToken(data.token);
        dispatch(setUserData(data));
        dispatch(setAuthorization(AuthorizationStatus.Auth));
        dispatch(setAuthorizationError(''));
      } catch (error: unknown) {
        dispatch(setAuthorization(AuthorizationStatus.NoAuth));

        const err = error as AxiosError;
        if (err?.response?.status === NOT_VERIFIED_CODE){
          dispatch(setAuthorizationError(NOT_VERIFIED_TEXT));
        }
      }
    },
  );


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'user/logout',
    async (_arg, {dispatch, extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(setAuthorization(AuthorizationStatus.NoAuth));
    },
  );
