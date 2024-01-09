import { render, screen } from '@testing-library/react';
import SignIn from './sign-in.tsx';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import {
  AuthorisationStatus,
  AppRoutes,
  NameSpace,
} from '../../consts.ts';
import { userInfo } from '../../utils/mock-data.ts';
import { MemoryHistory, createMemoryHistory } from 'history';

describe('Component: SignIn', () => {
  const mockUser = userInfo();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SignIn />, {
      [NameSpace.User]: {
        user: mockUser,
        authorisationStatus: AuthorisationStatus.Auth,
      },
    });

    const withHistoryComponent = withHistory(withStoreComponent);
    render(withHistoryComponent);

    expect(screen.getByTestId('sign-in-btn')).toBeInTheDocument();
  });

  it('should redirect to the main page when user is noAuth', () => {
    const mockHistory: MemoryHistory = createMemoryHistory();

    const { withStoreComponent } = withStore(<SignIn />, {
      [NameSpace.User]: {
        user: mockUser,
        authorisationStatus: AuthorisationStatus.NoAuth,
      },
    });

    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);

    expect(mockHistory.location.pathname).toBe(AppRoutes.Main);
  });
});
