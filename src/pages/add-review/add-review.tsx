import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmCardBg from '../../film-card/film-card-bg/film-card-bg';
import Breadcrumbs from '../../components/header/breadcrumbs-list/breadcrumb-list';
import FilmPoster from '../../components/film-poster/film-poster';
import CommentForm from '../../components/comment-form/comment-form';
import { AppRoutes } from '../../consts';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getError, getFilmDetails } from '../../store/film/selectors';
import { fetchFilmAction } from '../../store/api-actions';

function AddReview(){
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getFilmDetails);
  const error = useAppSelector(getError);


  useEffect(() => {
    if (error) {
      navigate(AppRoutes.NotFound);
    } else if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [error, id, dispatch, navigate]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <FilmCardBg img={film.backgroundImage} filmTitle={film.name} />
        <h1 className="visually-hidden">WTW</h1>

        <Header linkLogo={AppRoutes.Main}>
          <nav className="breadcrumbs">
            {
              film.id === undefined || null
                ? <Link to={AppRoutes.NotFound} />
                : <Breadcrumbs id={film.id} filmTitle={film.name} />
            }
          </nav>
        </Header>
        <FilmPoster imgSrc={film.posterImage} imgTitle={film.name} classes='film-card__poster--small' />
      </div>

      <div className="add-review">
        <CommentForm />
      </div>

    </section>
  );
}

export default AddReview;
