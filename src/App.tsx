import Main from './pages/main/main';
import { Film } from './types';
import { FilmsList } from './mocs/films-list';


function App(props: Film): JSX.Element {
  const { id, filmName, filmGenre, filmReleaseDate } = props;
  return (
    <Main
      id={id}
      filmName={filmName}
      filmGenre={filmGenre}
      filmReleaseDate={filmReleaseDate}
      filmList={FilmsList}
    />
  );
}

export default App;
