import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { AppRoutes, AuthorisationStatus, NameSpace } from '../../consts';
import { filmInfo, makeFakeStore, userInfo } from '../../utils/mock-data';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  const film = filmInfo();
  const user = userInfo();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render main page when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoutes.Main);

    render(withStoreComponent);
    expect(screen.getByText(/catalog/i)).toBeInTheDocument();
  });

  it('should render sign in page when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoutes.Login);

    render(withStoreComponent);
    expect(screen.getByRole('button', {name: /Sign in/i})).toBeInTheDocument();
  });

  it('should render my list page when user navigate to "/mylist"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        ...makeFakeStore(),
        [NameSpace.User]: {
          user: user,
          authorisationStatus: AuthorisationStatus.Auth
        }
      }
    );
    mockHistory.push(AppRoutes.MyList);

    render(withStoreComponent);
    expect(screen.getByText(/my list/i)).toBeInTheDocument();
  });

  it('should render film page when user navigate to "/film"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        ...makeFakeStore(),
        [NameSpace.Film]: {
          comments: [],
          similarFilms: [],
          isLoading: false,
          error: undefined,
          film: film
        }
      }
    );

    mockHistory.push(AppRoutes.Film.replace(':id', film.id));

    render(withStoreComponent);
    expect(screen.getByText(/more like this/i)).toBeInTheDocument();
  });

  it('should render add review page when user navigate to "/review"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        ...makeFakeStore(),
        [NameSpace.Film]: {
          comments: [],
          similarFilms: [],
          isLoading: false,
          error: undefined,
          film: film
        },
        [NameSpace.User]: {
          user: user,
          authorisationStatus: AuthorisationStatus.Auth
        }
      }
    );

    mockHistory.push(AppRoutes.AddReview.replace(':id', film.id));

    render(withStoreComponent);
    expect(screen.getByRole('button', {name: /post/i})).toBeInTheDocument();
  });

  it('should render player page when user navigate to "/player"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        ...makeFakeStore(),
        [NameSpace.Film]: {
          comments: [],
          similarFilms: [],
          isLoading: false,
          error: undefined,
          film: film
        }
      }
    );

    mockHistory.push(AppRoutes.Player.replace(':id', film.id));

    render(withStoreComponent);
    expect(screen.getByRole('button', {name: /play/i})).toBeInTheDocument();
  });
});
