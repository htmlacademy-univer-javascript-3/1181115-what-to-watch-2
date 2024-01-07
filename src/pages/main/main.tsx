import { useEffect, useMemo, useState, useCallback } from 'react';
import FilmCardBg from '../../film-card/film-card-bg/film-card-bg';
import Header from '../../components/header/header';
import FilmPoster from '../../components/film-poster/film-poster';
import PlayButton from '../../components/controls/play-button/play-button';
import AddToListButton from '../../components/controls/add-to-list-button/add-to-list-button';
import FilmCardDesc from '../../components/film-card/film-card-desc/film-card-desc';
import GenresList from '../../components/genre/genres-list/genres-list';
import MemoFilmsList from '../../components/films-list/films-list';
import ShowMoreButton from '../../components/controls/show-more-button/show-more-button';
import Footer from '../../components/footer/footer';
import LoadingBlock from '../../components/loading-block/loading-block';
import { GetFilmsByGenreFunc } from '../../types/types';
import {
  GenresEnum,
  MAX_NUM_FILMS,
  AuthorisationStatus,
} from '../../consts';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  fetchPromoFilmAction,
  fetchFavoriteFilmsAction,
  fetchFilmsAction,
} from '../../store/api-actions';
import { getGenre } from '../../store/films/selectors';
import {
  getFilmsInfo,
  getLoadingStatus,
  getPromoFilm,
} from '../../store/films/selectors';
import { getAuthStatus } from '../../store/user/selectors';

function MainPage() {
  const dispatch = useAppDispatch();

  const [maxNumFilms, setMaxNumFilms] = useState(MAX_NUM_FILMS);
  const activeGenre = useAppSelector(getGenre);
  const filmsInfo = useAppSelector(getFilmsInfo);
  const isLoadingFilms = useAppSelector(getLoadingStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const authorisationStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
    dispatch(fetchFilmsAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorisationStatus === AuthorisationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorisationStatus, dispatch]);

  const handleShowMoreBtnClick = () => {
    setMaxNumFilms((max) => max + MAX_NUM_FILMS);
  };

  const getFilmsByGenre: GetFilmsByGenreFunc = useCallback(
    (list) => {
      if (activeGenre === GenresEnum.AllGenres) {
        return list;
      } else {
        return list.filter((film) => film.genre === activeGenre);
      }
    },
    [activeGenre]
  );

  const filmsByGenre = getFilmsByGenre(filmsInfo);

  const shownFilms = useMemo(
    () => filmsByGenre.filter((_, idx) => idx < maxNumFilms),
    [filmsByGenre, maxNumFilms]
  );

  return (
    <>
      <section className="film-card">
        <FilmCardBg
          img={promoFilm.backgroundImage}
          filmTitle={promoFilm.name}
        />
        <h1 className="visually-hidden">WTW</h1>

        <Header linkLogo="/" classes="film-card__head" />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <FilmPoster
              imgSrc={promoFilm.posterImage}
              imgTitle={promoFilm.name}
            />

            <div className="film-card__desc">
              <FilmCardDesc
                title={promoFilm.name}
                genre={promoFilm.genre}
                year={promoFilm.released}
              />

              <div className="film-card__buttons">
                <PlayButton filmId={promoFilm.id} />
                <AddToListButton film={promoFilm} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <div className="catalog__films-list">
            {isLoadingFilms && <LoadingBlock />}
            <MemoFilmsList list={shownFilms} />
          </div>
          {shownFilms.length >= maxNumFilms ? (
            <ShowMoreButton onShowMoreClick={handleShowMoreBtnClick} />
          ) : null}
        </section>

        <Footer linkLogo="/" />
      </div>
    </>
  );
}

export default MainPage;
