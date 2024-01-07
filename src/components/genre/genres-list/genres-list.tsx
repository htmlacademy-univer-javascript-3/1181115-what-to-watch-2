import { useState, useEffect } from 'react';
import Genre from '../genre';
import { GenresEnum, MAX_NUM_GENRES } from '../../../consts';
import { updateGenre } from '../../../store/films/films-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getFilmsInfo } from '../../../store/films/selectors';

function GenresList() {
  const [activeGenre, setActiveGenre] = useState<GenresEnum | string>(
    GenresEnum.AllGenres
  );
  const dispatch = useAppDispatch();

  const films = useAppSelector(getFilmsInfo);

  const genres = new Set('');
  films.map((film) => genres.add(film.genre));

  useEffect(() => {
    dispatch(updateGenre(activeGenre));
  }, [dispatch, activeGenre]);

  return (
    <ul className="catalog__genres-list">
      <Genre
        key={GenresEnum.AllGenres}
        genre={GenresEnum.AllGenres}
        onGenreClick={setActiveGenre}
        activeClass={
          activeGenre === GenresEnum.AllGenres
            ? 'catalog__genres-item--active'
            : ''
        }
      />
      {[...genres]
        .filter((_, idx) => idx < MAX_NUM_GENRES)
        .map((genre) => (
          <Genre
            key={genre}
            genre={genre}
            onGenreClick={setActiveGenre}
            activeClass={
              activeGenre === genre ? 'catalog__genres-item--active' : ''
            }
          />
        ))}
    </ul>
  );
}

export default GenresList;
