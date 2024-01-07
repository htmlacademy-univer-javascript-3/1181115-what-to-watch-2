import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import MyList from './my-list';
import { AuthorisationStatus, NameSpace } from '../../consts';
import { generateFilmsArray, userInfo } from '../../utils/mock-data';

describe('Component: MyList', () => {
  const mockFilms = generateFilmsArray(3);
  const mockUser = userInfo();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <MyList />,
      {
        [NameSpace.MyList]: {
          isLoading: false,
          filmsInMyList: mockFilms,
          countFilmsInMyList: mockFilms.length
        },
        [NameSpace.User]: {
          user: mockUser,
          authorisationStatus: AuthorisationStatus.Auth
        },
      }
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
