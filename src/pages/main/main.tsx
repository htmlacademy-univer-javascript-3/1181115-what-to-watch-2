import {useMemo} from 'react';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { Film, Films } from '../../types';


type MainProps = Film & {
  myFilmlist: Films;
};

function Main({
  filmName,
  genre,
  filmReleaseDate,
  myFilmlist,
}: MainProps): JSX.Element {

  const activeGenreHash = useAppSelector((state)=>state.genre);
  const activeGenre = activeGenreHash.slice(1);

  const list = useAppSelector((state)=>state.films);

  const genres = useMemo(() => Array.from(new Set(list.map((film) => film.genre))),[list]);

  const filteredCards = useMemo(
    () => (
      (!activeGenre) ?
        list :
        list.filter((film)=> film.genre === activeGenre)),
    [list, activeGenre]
  );

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{filmName}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{filmReleaseDate}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{myFilmlist.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList genres={genres} />

          <FilmList films={filteredCards}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">
              Show more
            </button>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default Main;
