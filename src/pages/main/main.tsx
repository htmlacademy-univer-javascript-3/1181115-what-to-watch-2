import { useMemo, useState, useEffect, memo } from 'react';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';

import ShowMore from '../../components/show-more/show-more';
import { fetchFilmsAction, fetchPromoAction } from '../../store/api-actions/api-films-actions';
import LoadingBlock from '../../components/loading-block/loading-block';
import PlayButton from '../../components/buttons/play-button/play-button';
import AddToListButton from '../../components/buttons/add-to-list-button.tsx/add-to-list-button';
import { useMyFilms } from '../../hooks/use-my-films';


const CARD_LIMIT = 8;

const MemoizedAddTolistButton = memo(AddToListButton);

function Main(): JSX.Element {

  const isDataLoading = useAppSelector((state) => state.films.isDataLoading);
  const activeGenreHash = useAppSelector((state)=>state.films.genre);

  const {myFilms} = useMyFilms();
  const activeGenre = activeGenreHash.slice(1);
  const dispatch = useAppDispatch();


  const list = useAppSelector((state)=>state.films.films);
  const promo = useAppSelector((state)=>state.films.promo);
  const [limit, setLimit] = useState(CARD_LIMIT);


  useEffect(()=>{
    dispatch(fetchPromoAction());
    dispatch(fetchFilmsAction());
  },[dispatch]);


  const genres = useMemo(() => Array.from(new Set(list.map((film) => film.genre))),[list]);

  const filteredCards = useMemo(
    () => (
      (!activeGenre) ?
        list :
        list.filter((film)=> film.genre === activeGenre)),
    [list, activeGenre]
  );

  const filteredCardsWithLimit = useMemo(()=>filteredCards.slice(0, limit), [filteredCards, limit]);

  const handleMoreClick = () => {
    setLimit((l) => l + CARD_LIMIT);
  };

  return (
    (isDataLoading) ? <LoadingBlock /> :
      <>
        <section className="film-card">
          <div className="film-card__bg">
            <img
              src={promo.backgroundImage}
              alt={promo.name}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <img
                  src={promo.posterImage}
                  alt={promo.name}
                  width="218"
                  height="327"
                />
              </div>

              <div className="film-card__desc">
                <h2 className="film-card__title">{promo.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{promo.genre}</span>
                  <span className="film-card__year">{promo.released}</span>
                </p>

                <div className="film-card__buttons">

                  <PlayButton/>
                  <MemoizedAddTolistButton listLength={myFilms.length} />

                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenreList genres={genres} />

            <FilmList films={filteredCardsWithLimit}/>

            { filteredCards.length > limit && (
              <ShowMore onClickMore={handleMoreClick} />
            )}
          </section>
          <Footer/>
        </div>
      </>
  );
}

export default Main;
