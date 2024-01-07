import { AuthorisationStatus } from '../../consts';
import { userSlice } from './user-slice';
import { userInfo, userAuthData } from '../../utils/mock-data';
import { loginAction, logoutAction, verifyToken } from '../api-actions';

describe('UserSlice slice', () => {
  const emptyAction = { type: '' };
  const initialUser = {
    name: '',
    avatarUrl: '',
    email: '',
    token: '',
  };

  it('should return initial state with empty action', () => {
    const expectedState = {
      authorisationStatus: AuthorisationStatus.Auth,
      user: userInfo()
    };

    const result = userSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefind state', () => {
    const expectedState = {
      authorisationStatus: AuthorisationStatus.NoAuth,
      user: initialUser
    };

    const result = userSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should update "user" info and "authorisationStatus" to "Auth" in state with "loginAction.fulfilled" action', () => {
    const user = userInfo();
    const authData = userAuthData();

    const initialState = {
      authorisationStatus: AuthorisationStatus.Unknown,
      user: initialUser
    };

    const expectedState = {
      authorisationStatus: AuthorisationStatus.Auth,
      user: user
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(user, '', authData));
    expect(result).toEqual(expectedState);
  });

  it('should update "authorisationStatus" to "NoAuth" in state with "loginAction.rejected" action', () => {
    const initialState = {
      authorisationStatus: AuthorisationStatus.Unknown,
      user: initialUser
    };

    const expectedState = {
      authorisationStatus: AuthorisationStatus.NoAuth,
      user: initialUser
    };

    const result = userSlice.reducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should update "authorisationStatus" to "NoAuth" in state with "logoutAction.fulfilled" action', () => {
    const user = userInfo();

    const initialState = {
      authorisationStatus: AuthorisationStatus.Auth,
      user: user
    };

    const expectedState = {
      authorisationStatus: AuthorisationStatus.NoAuth,
      user: initialUser
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should update "authorisationStatus" to "Auth" and update "user" data in state with "verifyToken.fulfilled" action', () => {
    const user = userInfo();

    const initialState = {
      authorisationStatus: AuthorisationStatus.Unknown,
      user: initialUser
    };

    const expectedState = {
      authorisationStatus: AuthorisationStatus.Auth,
      user: user
    };

    const result = userSlice.reducer(initialState, verifyToken.fulfilled(user, '', undefined));
    expect(result).toEqual(expectedState);
  });
});
