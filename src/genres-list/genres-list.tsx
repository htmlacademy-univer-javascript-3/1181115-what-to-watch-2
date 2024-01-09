import { setActiveGenre } from '../store/films/films-slice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getGenre } from '../store/films/selectors';


type Props = {
  genres: string[];
}

type Genre ={
  text: string;
  href: string;
}

const ACTIVE_STYLE = 'catalog__genres-item--active';

function GenresList({ genres }: Props){
  const activeGenre = useAppSelector(getGenre);
  const dispatch = useAppDispatch();

  const allGenres = [
    {text: 'All genres', href: ''},
    ...genres.map((g)=>({text: g, href: `#${g}`})),
  ];

  const handleGenreChange = (genre:Genre)=>{
    dispatch(setActiveGenre(genre.text));
  };

  return(
    <ul className="catalog__genres-list" >
      {
        allGenres.map((genre)=>(
          <li
            key={genre.href}
            className={`catalog__genres-item ${activeGenre === genre.text ? ACTIVE_STYLE : ''}`}
            onClick={()=>handleGenreChange(genre)}
            role="genre"
          >
            <span className='catalog__genres-link'>{genre.text}</span>
          </li>
        ))
      }
    </ul>
  );
}

export default GenresList;
