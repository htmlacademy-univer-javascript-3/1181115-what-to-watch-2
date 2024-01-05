import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserData } from '../../types';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions/api-user-actions';


export type StateType = {
  user: UserData | null;
  authorizationStatus: string;
  error: string | null;
};

export const initialState: StateType = {
  user: null,
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
};

export const userSlice = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setAuthorizationError:(state, action:PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })

      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
