import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const';
import Main from './pages/main/main';

import { Film } from './types';
import { FilmsList } from './mocs/films-list';
import SignIn from './pages/sign-in/sign-in';
import MyList from './pages/my-list/my-list';
import Movie from './pages/movie/movie';
import Review from './pages/review/review';
import Player from './pages/player/player';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PrivateRoute from './components/private-route/private-route';

function App(props: Film): JSX.Element {
  const { id, filmName, filmGenre, filmReleaseDate } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main
              id={id}
              filmName={filmName}
              filmGenre={filmGenre}
              filmReleaseDate={filmReleaseDate}
              filmList={FilmsList}
            />
          }
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<Movie />} />
        <Route path={AppRoute.Review} element={<Review />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
