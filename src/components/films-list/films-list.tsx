import { useState, memo } from 'react';
import FilmCard from '../film-card/film-card';
import { PropsList, FilmCardProps } from '../../types/types';

function FilmsList({ list }: PropsList<FilmCardProps>) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <>
      {list.map((film) => (
        <FilmCard
          key={film.id}
          id={film.id}
          name={film.name}
          previewImage={film.previewImage}
          active={activeCardId === film.id}
          genre={film.genre}
          onFilmCardMouseEvent={setActiveCardId}
          previewVideoLink={film.previewVideoLink}
        />
      ))}
    </>
  );
}

const MemoFilmsList = memo(FilmsList);

export default MemoFilmsList;
