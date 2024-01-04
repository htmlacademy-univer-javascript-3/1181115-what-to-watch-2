import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { setAuthorization, setAuthorizationError, setUserData } from '../action';
import { UserData } from '../../types';


export type StateType = {
  user: UserData;
  authorizationStatus: string;
  error: string | null;
  isAuthLoading: boolean;
};

const initialState: StateType = {
  user: {
    name: '',
    avatarUrl: '',
    email: '',
    token: '',
  },
  isAuthLoading: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
};

export const userSlice = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })

      .addCase(setUserData, (state, action) => {
        state.user = action.payload;
      })

      .addCase(setAuthorizationError, (state, action) =>{
        state.error = action.payload;
      });
  }
});
