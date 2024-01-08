import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateFilmsArray, promoFilmInfo, userInfo, extractActionsTypes } from '../../utils/mock-data';
import Main from './main';
import { APIRoute, AuthorisationStatus, NameSpace } from '../../consts';
import { fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoAction } from '../../store/api-actions';
import { setActiveGenre } from '../../store/films/films-slice';


describe('Component: Main', () => {
  const mockFilms = generateFilmsArray(24);
  const mockUser = userInfo();
  const mockPromo = promoFilmInfo();

  it('should render correctly and load data', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <Main />,
      {
        [NameSpace.Films]: {
          films: mockFilms,
          promoFilm: mockPromo,
          isLoading: false,
          genre: ''
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

    expect(screen.getByText(mockPromo.name)).toBeInTheDocument();
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      setActiveGenre.type,
      fetchPromoAction.pending.type,
      fetchFilmsAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      fetchPromoAction.fulfilled.type,
      fetchFilmsAction.fulfilled.type,
      fetchFavoriteFilmsAction.fulfilled.type,
    ]));
  });
});
