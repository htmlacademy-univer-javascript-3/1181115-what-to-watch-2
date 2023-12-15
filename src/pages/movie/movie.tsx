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
import { useAppSelector } from '../../hooks';
import { fullInfoFilm } from '../../mocs/full-info-film';


const CARD_LIMIT = 4;


function Movie(): JSX.Element {
  const location = useLocation();
  const activePage = location.hash.slice(1);

  const filmDescriptionTabs = Array.from(Object.values(FilmPageTab),(x) =>(x));

  const list = useAppSelector((state)=>state.films.films);
  const similarFilms = list.filter((film)=> film.genre === fullInfoFilm.genre).slice(0, CARD_LIMIT);

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={fullInfoFilm.filmImg}
              alt={fullInfoFilm.filmName}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{fullInfoFilm.filmName}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{fullInfoFilm.genre}</span>
                <span className="film-card__year">{fullInfoFilm.filmReleaseDate}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton />
                <AddToListButton/>

                <Link to={AppRoute.AddReview.replace(':id', fullInfoFilm.id.toString())} className="btn film-card__button">
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
                src={fullInfoFilm.filmPoster}
                alt={fullInfoFilm.filmName}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <Tabs tabs={filmDescriptionTabs}/>
              {
                (activePage === '' || activePage === filmDescriptionTabs[0]) &&
                  <Overview
                    ratingScore={fullInfoFilm.ratingScore}
                    ratingLevel={fullInfoFilm.ratingLevel}
                    ratingCount={fullInfoFilm.ratingCount}
                    description={fullInfoFilm.description}
                    director={fullInfoFilm.director}
                    starring={fullInfoFilm.starring}
                  />
              }
              {
                (activePage === filmDescriptionTabs[1]) &&
                  <Details
                    director={fullInfoFilm.director}
                    starring={fullInfoFilm.starring}
                    runTime={fullInfoFilm.runTime}
                    genre={fullInfoFilm.genre}
                    filmReleaseDate={fullInfoFilm.filmReleaseDate}
                  />
              }
              {
                (activePage === filmDescriptionTabs[2]) &&
                  <ReviewsBlock reviews={fullInfoFilm.reviews}/>
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
