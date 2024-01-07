import { fireEvent, render, screen } from '@testing-library/react';
import Player from './player';
import { withHistory, withStore } from '../../utils/mock-component';
import { NameSpace } from '../../consts';
import { filmInfo, generateFilmsArray, promoFilmInfo } from '../../utils/mock-data';
import { SpyInstance } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Component: Player', () => {
  const mockFilm = filmInfo();
  const mockFilms = generateFilmsArray(1);
  mockFilms[0].id = mockFilm.id;

  let pauseStub: SpyInstance<[], void>;
  let playStub: SpyInstance<[], Promise<void>>;

  beforeAll(() => {
    pauseStub = vi
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => undefined);

    playStub = vi
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(async () => new Promise(() => undefined));
  });

  beforeEach(() => {
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    Object.defineProperty(document, 'fullscreenElement', {
      writable: true,
      value: undefined,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Player />, {
      [NameSpace.Film]: {
        comments: [],
        similarFilms: [],
        isLoading: false,
        error: undefined,
        film: mockFilm
      },
    });

    const withHistoryComponent = withHistory(withStoreComponent);
    render(withHistoryComponent);

    expect(screen.getByText('Full screen')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should display play and pause buttons', async () => {
    const { withStoreComponent } = withStore(<Player />, {
      [NameSpace.Film]: {
        comments: [],
        similarFilms: [],
        isLoading: false,
        error: undefined,
        film: mockFilm
      },
      [NameSpace.Films]: {
        films: mockFilms,
        genre: 'All genres',
        isLoading: false,
        promoFilm: promoFilmInfo()
      },
    });

    const withHistoryComponent = withHistory(withStoreComponent);
    render(withHistoryComponent);

    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(playStub).toHaveBeenCalled();
    fireEvent.timeUpdate(screen.getByTestId('video-player'));
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(pauseStub).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });


  it('should display play and pause buttons', async () => {
    const { withStoreComponent } = withStore(<Player />, {
      [NameSpace.Film]: {
        comments: [],
        similarFilms: [],
        isLoading: false,
        error: undefined,
        film: mockFilm
      },
      [NameSpace.Films]: {
        films: mockFilms,
        genre: 'All genres',
        isLoading: false,
        promoFilm: promoFilmInfo()
      },
    });

    const withHistoryComponent = withHistory(withStoreComponent);
    render(withHistoryComponent);

    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(playStub).toHaveBeenCalled();
    fireEvent.timeUpdate(screen.getByTestId('video-player'));
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(pauseStub).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });
});
