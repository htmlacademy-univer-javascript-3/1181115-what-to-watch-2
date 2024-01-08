import { Link, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { setActiveGenre } from '../store/films/films-slice';
import { MAX_NUM_GENRES } from '../consts';


type Props = {
  genres: string[];
}

const ACTIVE_STYLE = 'catalog__genres-item--active';

function GenreList({ genres }: Props){
  const location = useLocation();
  const dispatch = useAppDispatch();

  const allGenres = [
    {text: 'All genres', href: ''},
    ...genres.map((g)=>({text: g, href: `#${g}`})),
  ];

  useEffect(() => {
    dispatch(setActiveGenre(location.hash));
  },[location, dispatch]);

  return(
    <ul className="catalog__genres-list">
      {
        allGenres.slice(0,MAX_NUM_GENRES).map((genre)=>(
          <li key={genre.href} className={`catalog__genres-item ${location.hash === genre.href ? ACTIVE_STYLE : ''}`}>
            <Link to={genre.href} className="catalog__genres-link">
              {genre.text}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

export default GenreList;
