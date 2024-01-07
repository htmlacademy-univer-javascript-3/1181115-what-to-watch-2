import { NameSpace, AuthorisationStatus } from '../../consts';
import { userInfo } from '../../utils/mock-data';
import { getAuthStatus, getUserInfo } from './selectors';

describe('UserSlice selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorisationStatus: AuthorisationStatus.Auth,
      user: userInfo(),
    }
  };

  it('should return authorization status from state', () => {
    const { authorisationStatus } = state[NameSpace.User];
    expect(getAuthStatus(state)).toEqual(authorisationStatus);
  });

  it('should return user data from state', () => {
    const { user } = state[NameSpace.User];
    expect(getUserInfo(state)).toEqual(user);
  });
});
