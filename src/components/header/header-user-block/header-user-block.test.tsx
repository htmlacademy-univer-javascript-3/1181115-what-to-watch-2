import { render, screen } from '@testing-library/react';
import HeaderUserBlock from './header-user-block';
import { withHistory, withStore } from '../../../utils/mock-component';
import { extractActionsTypes, userInfo } from '../../../utils/mock-data';
import { APIRoute, AppRoutes, AuthorisationStatus } from '../../../consts';
import { NameSpace } from '../../../consts';
import { MemoryHistory, createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { logoutAction } from '../../../store/api-actions';

describe('Component: HeaderUserBlock', () => {
  it('should render correctly', () => {
    const user = userInfo();
    const { withStoreComponent } = withStore(<HeaderUserBlock />, {
      [NameSpace.User]: {
        authorisationStatus: AuthorisationStatus.Auth,
        user
      }
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should rederect to "MyList" when user click on the avatar', async() => {
    const mockHistory: MemoryHistory = createMemoryHistory();

    const user = userInfo();
    const { withStoreComponent } = withStore(<HeaderUserBlock />, {
      [NameSpace.User]: {
        authorisationStatus: AuthorisationStatus.Auth,
        user
      }
    });

    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId('user-avatar'));
    expect(mockHistory.location.pathname).toBe(AppRoutes.MyList);
  });

  it('should dispatch "Logout()" when user click on "Sign out"', async() => {
    const mockHistory: MemoryHistory = createMemoryHistory();

    const user = userInfo();
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<HeaderUserBlock />, {
      [NameSpace.User]: {
        authorisationStatus: AuthorisationStatus.Auth,
        user
      }
    });

    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId('sign-out-btn'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);
  });
});
