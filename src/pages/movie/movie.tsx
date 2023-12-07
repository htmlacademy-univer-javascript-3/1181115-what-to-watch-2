import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FullFilm } from '../../types';
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


function Movie(props: FullFilm): JSX.Element {
  const location = useLocation();
  const activePage = location.hash.slice(1);

  const filmDescriptionTabs = Array.from(Object.values(FilmPageTab),(x) =>(x));

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={props.filmImg}
              alt={props.filmName}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{props.filmName}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.genre}</span>
                <span className="film-card__year">{props.filmReleaseDate}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton />
                <AddToListButton/>

                <Link to={AppRoute.AddReview.replace(':id', props.id.toString())} className="btn film-card__button">
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
                src={props.filmPoster}
                alt={props.filmName}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <Tabs tabs={filmDescriptionTabs}/>
              {
                (activePage === '' || activePage === filmDescriptionTabs[0]) &&
                  <Overview
                    ratingScore={props.ratingScore}
                    ratingLevel={props.ratingLevel}
                    ratingCount={props.ratingCount}
                    description={props.description}
                    director={props.director}
                    starring={props.starring}
                  />
              }
              {
                (activePage === filmDescriptionTabs[1]) &&
                  <Details
                    director={props.director}
                    starring={props.starring}
                    runTime={props.runTime}
                    genre={props.genre}
                    filmReleaseDate={props.filmReleaseDate}
                  />
              }
              {
                (activePage === filmDescriptionTabs[2]) &&
                  <ReviewsBlock reviews={props.reviews}/>
              }
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={props.moreLikeThis} />
        </section>

        <Footer/>
      </div>
    </div>
  );
}

export default Movie;
