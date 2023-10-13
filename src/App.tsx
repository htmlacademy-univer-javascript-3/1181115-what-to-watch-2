import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import Layout from './components/layout';
import { Film } from './types';
import { FilmsList } from './mocs/films-list';
import SignIn from './pages/sign-in/sign-in';
import MyList from './pages/my-list/my-list';
import Movie from './pages/movie/movie';
import Review from './pages/review/review';
import Player from './pages/player/player';

function App(props: Film): JSX.Element {
  const { id, filmName, filmGenre, filmReleaseDate } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
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
          <Route path="/login" element={<SignIn />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/films/:id" element={<Movie />}/>
          <Route path="/films/:id/review" element={<Review />} />
          <Route path="/player/:id" element={<Player />} />
          <Route
            path="*"
            element={<h1>Ошибка 404. Страница не существует.</h1>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
