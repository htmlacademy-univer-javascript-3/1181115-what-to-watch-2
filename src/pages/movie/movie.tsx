import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FilmList from '../../components/film-list/film-list';
import PlayButton from '../../components/buttons/play-button/play-button';
import AddToListButton from '../../components/buttons/add-to-list-button.tsx/add-to-list-button';
import Overview from '../../components/about-film/overview/overview';
import Details from '../../components/about-film/details/details';
import ReviewsBlock from '../../components/about-film/reviews/reviews';
import Tabs from '../../components/tabs/tabs';
import {FilmPageTab} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFullFilmAction, fetchSimilarFilmsAction } from '../../store/api-actions/api-film-actions';


const CARD_LIMIT = 4;


function Movie(): JSX.Element | null {
  const fullFilm = useAppSelector((state) => state.films.fullFilm);
  const list = useAppSelector((state)=>state.films.similarFilms);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const activePage = location.hash.slice(1);
  const filmId = location.pathname.slice(7);


  const filmDescriptionTabs = Array.from(Object.values(FilmPageTab),(x) =>(x));

  useEffect(()=>{
    dispatch(fetchFullFilmAction(filmId));

  },[]);


  useEffect(() => {
    if(fullFilm){
      dispatch(fetchSimilarFilmsAction(fullFilm.id));
    }
  }, [fullFilm]);


  const similarFilms = list.slice(0, CARD_LIMIT);

  return (
    (fullFilm) &&
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={fullFilm.backgroundImage}
              alt={fullFilm.name}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{fullFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{fullFilm.genre}</span>
                <span className="film-card__year">{fullFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton />
                <AddToListButton/>

                <Link to={AppRoute.AddReview.replace(':id', fullFilm.id.toString())} className="btn film-card__button">
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={fullFilm.posterImage}
                alt={fullFilm.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <Tabs tabs={filmDescriptionTabs}/>
              {
                (activePage === '' || activePage === filmDescriptionTabs[0]) &&
                  <Overview />
              }
              {
                (activePage === filmDescriptionTabs[1]) &&
                  <Details />
              }
              {
                (activePage === filmDescriptionTabs[2]) &&
                  <ReviewsBlock />
              }
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms} />
        </section>

        <Footer/>
      </div>
    </div>
  );
}

export default Movie;
