import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { setAuthorization, setAuthorizationError, setUserData } from '../action';
import { UserData } from '../../types';


export type StateType = {
  user: UserData;
  authorizationStatus: string;
  error: string | null;
};

const initialState: StateType = {
  user: {
    name: '',
    avatarUrl: '',
    email: '',
    token: '',
  },
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
};

const userReducer = createReducer(initialState, (builder)=>{
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
});

export {userReducer};
