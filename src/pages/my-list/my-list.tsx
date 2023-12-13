import { useAppSelector } from '../../hooks';

import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import LoadingBlock from '../../components/loading-block/loading-block';


function MyList(): JSX.Element {
  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const myFilmList = useAppSelector((state) => state.films);


  if (isDataLoading) {
    return (
      <LoadingBlock />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{myFilmList.length}</span>
        </h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList films={myFilmList} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
