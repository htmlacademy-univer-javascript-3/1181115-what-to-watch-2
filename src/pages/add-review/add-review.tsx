import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FilmCardBg from '../../film-card/film-card-bg/film-card-bg';
import Breadcrumbs from '../../components/header/breadcrumbs-list/breadcrumb-list';
import FilmPoster from '../../components/film-poster/film-poster';
import CommentForm from '../../components/comment-form/comment-form';
import { AppRoutes } from '../../consts';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getError, getFilmInfo } from '../../store/film/selectors';
import { fetchFilmAction } from '../../store/api-actions';

function AddReview(){
  const film = useAppSelector(getFilmInfo);
  const error = useAppSelector(getError);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error !== undefined) {
      navigate(AppRoutes.NotFound);
    } else if (error === undefined && film.id === '' && id !== undefined) {
      dispatch(fetchFilmAction(id));
    }
  }, [error, film.id, id, dispatch, navigate]);

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
