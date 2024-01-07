import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore, withHistory } from '../../../utils/mock-component';
import { NameSpace, AuthorisationStatus, APIRoute, FavoriteFilmStatus } from '../../../consts';
import AddToListButton from './add-to-list-button';
import { filmInfo, generateFilmsArray, userInfo, extractActionsTypes } from '../../../utils/mock-data';
import { addFilmToFavoriteAction, removeFilmToFavoriteAction } from '../../../store/api-actions';

describe('Component: AddToListButton', () => {
  const mockUser = userInfo();
  const mockFilms = generateFilmsArray(3);

  it('should render correctly', () => {
    const mockFilm = filmInfo();

    const { withStoreComponent } = withStore(
      <AddToListButton film={mockFilm} />,
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

    expect(Number(screen.getByTestId('my-list-count').textContent)).toBe(mockFilms.length);
  });

  it('should dispatch "addFilmToFavoriteAction" when user is Auth and click on button "MyList" and isFavotite equal false', async () => {
    const mockFilm = { ...filmInfo(), isFavorite: false};

    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <AddToListButton film={mockFilm} />,
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

    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockFilm.id}/${FavoriteFilmStatus.AddToFavorite}`).reply(200);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      addFilmToFavoriteAction.pending.type,
      addFilmToFavoriteAction.fulfilled.type
    ]);
  });

  it('should dispatch "removeFilmToFavoriteAction" when user is Auth and click on button "MyList" and isFavotite equal true', async () => {
    const mockFilm = { ...mockFilms[0], isFavorite: true};

    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(
      <AddToListButton film={mockFilm} />,
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

    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockFilm.id}/${FavoriteFilmStatus.RemoveFromFavorite}`).reply(200);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      removeFilmToFavoriteAction.pending.type,
      removeFilmToFavoriteAction.fulfilled.type
    ]);
  });
});
