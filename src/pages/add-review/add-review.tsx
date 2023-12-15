import CommentSubmissionForm from '../../components/comment-submission-form/comment-submission-form';
import UserBlock from '../../components/user-block/user-block';

// type ReviewProps = {
//   filmName: string;
//   filmImg: string;
// };


function AddReview(): JSX.Element {

  // const { filmName, filmImg } = props;

  return (
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
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                {/* <a href="film-page.html" className="breadcrumbs__link">{filmName}</a> */}
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            // src={filmImg}
            // alt={filmName}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <CommentSubmissionForm />
      </div>
    </section>
  );
}

export default AddReview;
