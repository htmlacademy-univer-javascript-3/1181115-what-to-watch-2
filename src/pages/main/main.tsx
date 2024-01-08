import { useEffect, useMemo, useState } from 'react';
import FilmCardBg from '../../film-card/film-card-bg/film-card-bg';
import Header from '../../components/header/header';
import FilmPoster from '../../components/film-poster/film-poster';
import PlayButton from '../../components/controls/play-button/play-button';
import AddToListButton from '../../components/controls/add-to-list-button/add-to-list-button';
import FilmCardDesc from '../../components/film-card/film-card-desc/film-card-desc';
import GenresList from '../../genres-list/genres-list';
import MemoFilmsList from '../../components/films-list/films-list';
import ShowMoreButton from '../../components/controls/show-more-button/show-more-button';
import Footer from '../../components/footer/footer';
import LoadingBlock from '../../components/loading-block/loading-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user/selectors';
import { getFilmsInfo, getGenre, getLoadingStatus, getPromoFilm } from '../../store/films/selectors';
import { fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoAction } from '../../store/api-actions';
import { AuthorisationStatus } from '../../consts';


const CARD_LIMIT = 8;

function Main() {
  const authStatus = useAppSelector(getAuthStatus);
  const isDataLoading = useAppSelector(getLoadingStatus);

  const activeGenreHash = useAppSelector(getGenre);
  const activeGenre = activeGenreHash.slice(1);
  const dispatch = useAppDispatch();

  const list = useAppSelector(getFilmsInfo);
  const promo = useAppSelector(getPromoFilm);
  const [limit, setLimit] = useState(CARD_LIMIT);

  useEffect(() => {
    dispatch(fetchPromoAction());
    dispatch(fetchFilmsAction());
  }, [dispatch]);

  const genres = useMemo(() => Array.from(new Set(list.map((film) => film.genre))),[list]);


  useEffect(() => {
    if (authStatus === AuthorisationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authStatus, dispatch]);

  const handleMoreClick = () => {
    setLimit((l) => l + CARD_LIMIT);
  };


  const filteredCards = useMemo(
    () => (
      (!activeGenre) ?
        list :
        list.filter((film)=> film.genre === activeGenre)),
    [list, activeGenre]
  );

  const filteredCardsWithLimit = useMemo(()=>filteredCards.slice(0, limit), [filteredCards, limit]);

  return (
    <>
      <section className="film-card">
        <FilmCardBg
          img={promo.backgroundImage}
          filmTitle={promo.name}
        />
        <h1 className="visually-hidden">WTW</h1>

        <Header linkLogo="/" classes="film-card__head" />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <FilmPoster
              imgSrc={promo.posterImage}
              imgTitle={promo.name}
            />

            <div className="film-card__desc">
              <FilmCardDesc
                title={promo.name}
                genre={promo.genre}
                year={promo.released}
              />

              <div className="film-card__buttons">
                <PlayButton filmId={promo.id} />
                <AddToListButton film={promo} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} />

          <div className="catalog__films-list">
            {isDataLoading && <LoadingBlock />}
            <MemoFilmsList list={filteredCardsWithLimit} />
          </div>
          {filteredCardsWithLimit.length >= limit ? (
            <ShowMoreButton onShowMoreClick={handleMoreClick} />
          ) : null}
        </section>

        <Footer linkLogo="/" />
      </div>
    </>
  );
}

export default Main;
