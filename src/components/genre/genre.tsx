import { GenreProps } from '../../types/types';
import './genre.css';

function Genre({ genre, activeClass, onGenreClick }: GenreProps) {
  return (
    <li
      className={`catalog__genres-item genre-item_hover ${activeClass}`}
      onClick={() => onGenreClick(genre)}
      role="genre"
    >
      <a className="catalog__genres-link">{genre}</a>
    </li>
  );
}

export default Genre;
