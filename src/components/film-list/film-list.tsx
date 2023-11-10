import { useState } from 'react';
import { Films} from '../../types';
import FilmCard from '../film-card.jsx/film-card';


function FilmList(list: Films): JSX.Element {
  const [activeCard, setActiveCard] = useState<number|null>(null);

  console.log(list)

  function handleMouseMove(id: number|null) {
    setActiveCard((activeCard)=>id);
  }

  return (
    <div className="catalog__films-list">
      {list.map((film) => (
        <FilmCard key={film.id} {...film} handleMouseMove={handleMouseMove}/>
      ))}
    </div>
  );
}

export default FilmList;
