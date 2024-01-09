import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import Header from './header';
import { AppRoutes, NameSpace, AuthorisationStatus } from '../../consts';
import { userInfo } from '../../utils/mock-data';

describe('Component: Header', () => {
  const mockChildren = <h1>Test text</h1>;
  const user = userInfo();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <Header linkLogo={AppRoutes.Main}>
        {mockChildren}
      </Header>,
      {
        [NameSpace.User]: {
          user: user,
          authorisationStatus: AuthorisationStatus.Auth
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('should render "HeaderUserBlock" if authorization status is Autn', () => {
    const { withStoreComponent } = withStore(
      <Header linkLogo={AppRoutes.Main}>
        {mockChildren}
      </Header>,
      {
        [NameSpace.User]: {
          user: user,
          authorisationStatus: AuthorisationStatus.Auth
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should render "HeadGuest" if authorization status is noAutn', () => {
    const { withStoreComponent } = withStore(
      <Header linkLogo={AppRoutes.Main}>
        {mockChildren}
      </Header>,
      {
        [NameSpace.User]: {
          user: user,
          authorisationStatus: AuthorisationStatus.NoAuth
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});

