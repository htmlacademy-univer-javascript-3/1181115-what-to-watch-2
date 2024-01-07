import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorisationStatus } from '../../consts';
import { UserSlice } from '../../types/state';
import { loginAction, logoutAction, verifyToken } from '../api-actions';
import { getToken } from '../../services/token';

const token = getToken();

const initialState: UserSlice = {
  authorisationStatus: token ? AuthorisationStatus.Unknown : AuthorisationStatus.NoAuth,
  user: {
    name: '',
    avatarUrl: '',
    email: '',
    token: '',
  }
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorisationStatus = AuthorisationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorisationStatus = AuthorisationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorisationStatus = AuthorisationStatus.NoAuth;
        state.user = {
          name: '',
          avatarUrl: '',
          email: '',
          token: '',
        };
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.authorisationStatus = AuthorisationStatus.Auth;
        state.user = action.payload;
      });
  },
});
