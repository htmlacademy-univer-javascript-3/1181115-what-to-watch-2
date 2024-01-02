import { useState } from 'react';
import { Film} from '../../types';
import FilmCard from '../film-card.jsx/film-card';

type Props = {
  films: Film[];
}

function FilmList({films}: Props): JSX.Element {
  const [activeCard, setActiveCard] = useState<string|null>(null);

  function handleMouseMove(id: string|null) {
    setActiveCard(()=>id);
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          isActive={film.id === activeCard}
          key={film.id}
          {...film}
          onMouseMove={handleMouseMove}
        />
      ))}
    </div>
  );
}

export default FilmList;
