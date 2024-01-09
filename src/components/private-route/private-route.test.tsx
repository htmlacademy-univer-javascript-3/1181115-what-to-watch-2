import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoutes } from '../../consts';
import { withHistory, withStore } from '../../utils/mock-component';
import PrivateRoute from './private-route';
import { NameSpace, AuthorisationStatus } from '../../consts';
import { userInfo } from '../../utils/mock-data';

describe('Component: PrivateRoute', () => {
  const user = userInfo();
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render children when the user is authorized', () => {
    const { withStoreComponent } = withStore(
      <PrivateRoute>
        <span>Test text</span>
      </PrivateRoute>,
      {
        [NameSpace.User]: {
          authorisationStatus: AuthorisationStatus.Auth,
          user
        }
      }
    );
    render(withStoreComponent);
    expect(screen.getByText(/Test text/i)).toBeInTheDocument();
  });

  it('should render component for "Login" route, when user not authorizate', () => {
    const { withStoreComponent } = withStore(
      <PrivateRoute>
        <span>Test text</span>
      </PrivateRoute>,
      {
        [NameSpace.User]: {
          authorisationStatus: AuthorisationStatus.NoAuth,
          user
        }
      }
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    render(preparedComponent);

    expect(screen.queryByText(/Test text/i)).not.toBeInTheDocument();
    expect(mockHistory.location.pathname).toBe(AppRoutes.Login);
  });
});
