import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoutes } from '../../consts';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Movie from '../../pages/movie/movie';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { useAppDispatch } from '../../hooks';
import { verifyToken, fetchFilmsAction } from '../../store/api-actions';
import { getToken } from '../../services/token';

const token = getToken();

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmsAction());
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path={AppRoutes.Main}
        element={
          <Main />
        }
      />
      <Route path={AppRoutes.Login} element={<SignIn />} />
      <Route
        path={AppRoutes.MyList}
        element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
      />
      <Route path={AppRoutes.Film} element={<Movie />}/>
      <Route
        path={AppRoutes.AddReview}
        element={
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.Player}
        element={<Player />}
      />
      <Route path={AppRoutes.NotFound} element={<NotFound />} />
    </Routes>
  );
}

export default App;
