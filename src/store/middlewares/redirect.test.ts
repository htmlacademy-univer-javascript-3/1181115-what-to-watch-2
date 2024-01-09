import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { redirectToRoute } from '../action';
import { AppRoutes } from '../../consts';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect moddleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with "redirectToRoute" action', () => {
    const redirectAction = redirectToRoute(AppRoutes.Login);
    store.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoutes.Login);
  });

  it('should not redirect to "/film" with "redirectToRoute" action', () => {
    const emptyAction = { type: '', payload: AppRoutes.Film };
    store.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(AppRoutes.Film);
  });
});
