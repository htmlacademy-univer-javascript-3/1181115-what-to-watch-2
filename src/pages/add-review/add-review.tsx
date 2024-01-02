import CommentSubmissionForm from '../../components/comment-submission-form/comment-submission-form';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import Breadcrumbs from '../../components/header/breadcrumbs/breadcrumbs';


function AddReview(): JSX.Element |null {

  const film = useAppSelector((state)=>state.fullFilm.film);


  return (
    (!film) ?
      null :
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img
              src="img/bg-the-grand-budapest-hotel.jpg"
              alt="The Grand Budapest Hotel"
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo styleType='normal' />
            <Breadcrumbs id={film.id} name={film.name} />
            <UserBlock />
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img
              src={film.posterImage}
              alt={film.name}
              width="218"
              height="327"
            />
          </div>
        </div>

        <div className="add-review">
          <CommentSubmissionForm filmId={film.id}/>
        </div>
      </section>
  );
}

export default AddReview;
