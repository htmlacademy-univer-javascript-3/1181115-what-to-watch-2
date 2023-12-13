import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import Main from './pages/main/main';
import SignIn from './pages/sign-in/sign-in';
import MyList from './pages/my-list/my-list';
import Movie from './pages/movie/movie';
import AddReview from './pages/add-review/add-review';
import Player from './pages/player/player';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PrivateRoute from './components/private-route/private-route';


function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main />
          }
        />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            // <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>

              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<Movie/>} />
        <Route path={AppRoute.AddReview} element={<AddReview />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
