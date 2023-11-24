import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import Main from './pages/main/main';
import { Film } from './types';
import SignIn from './pages/sign-in/sign-in';
import MyList from './pages/my-list/my-list';
import Movie from './pages/movie/movie';
import AddReview from './pages/add-review/add-review';
import Player from './pages/player/player';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PrivateRoute from './components/private-route/private-route';
import { FullInfoFilm } from './mocs/full-info-film';

type AppProps = Film & {
  list: Film[];
  myFilmList: Film[];
};

function App(props: AppProps): JSX.Element {
  const { id, filmName, filmGenre, filmReleaseDate, filmImg, list, myFilmList } = props;

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
              filmImg={filmImg}
              list={list}
            />
          }
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            // <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>

              <MyList myFilmList={myFilmList}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<Movie {...FullInfoFilm}/>} />
        <Route path={AppRoute.AddReview} element={<AddReview filmName={filmName} filmImg={filmImg}/>} />
        <Route path={AppRoute.Player} element={<Player filmImg={filmImg}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
