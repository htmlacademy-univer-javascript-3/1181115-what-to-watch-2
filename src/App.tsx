import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { AppRoute } from './const';
import Main from './pages/main/main';
import SignIn from './pages/sign-in/sign-in';
import MyList from './pages/my-list/my-list';
import Movie from './pages/movie/movie';
import AddReview from './pages/add-review/add-review';
import Player from './pages/player/player';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PrivateRoute from './components/private-route/private-route';
import LoadingBlock from './components/loading-block/loading-block';
import { getToken } from './api/token';
import { checkAuthAction } from './store/api-actions/api-user-actions';
import { useEffect } from 'react';
import { getIsAuthLoading } from './store/selectors/user-selector';


const token = getToken();

function App(): JSX.Element {
  const isAuthLoading = useAppSelector(getIsAuthLoading);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(token) {
      dispatch(checkAuthAction());
    }
  }, [dispatch]);

  return (
    (isAuthLoading) ? <LoadingBlock /> :
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
              <PrivateRoute >
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
