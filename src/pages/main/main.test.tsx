import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateFilmsArray, promoFilmInfo, userInfo, extractActionsTypes } from '../../utils/mock-data';
import MainPage from './main';
import { APIRoute, AuthorisationStatus, NameSpace } from '../../consts';
import { fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoFilmAction } from '../../store/api-actions';
import { updateGenre } from '../../store/films/films-slice';


describe('Component: Main', () => {
  const mockFilms = generateFilmsArray(24);
  const mockUser = userInfo();
  const mockPromo = promoFilmInfo();

  it('should render correctly and load data', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <MainPage />,
      {
        [NameSpace.Films]: {
          films: mockFilms,
          promoFilm: mockPromo,
          isLoading: false,
          genre: 'All genres'
        },
        [NameSpace.User]: {
          user: mockUser,
          authorisationStatus: AuthorisationStatus.Auth
        },
        [NameSpace.MyList]: {
          isLoading: false,
          filmsInMyList: [],
          countFilmsInMyList: 0
        },
      }
    );

    const withHistoryComponent = withHistory(withStoreComponent);

    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);
    mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromo);
    mockAxiosAdapter.onGet(APIRoute.Films).reply(200, mockFilms);

    render(withHistoryComponent);

    expect(screen.getByText(mockFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockPromo.name)).toBeInTheDocument();
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      updateGenre.type,
      fetchPromoFilmAction.pending.type,
      fetchFilmsAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      fetchPromoFilmAction.fulfilled.type,
      fetchFilmsAction.fulfilled.type,
      fetchFavoriteFilmsAction.fulfilled.type,
    ]));
  });
});
