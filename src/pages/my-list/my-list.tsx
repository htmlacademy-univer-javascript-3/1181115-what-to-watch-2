import { useAppSelector } from '../../hooks';

import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import LoadingBlock from '../../components/loading-block/loading-block';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import { getIsMyFilmsLoading } from '../../store/selectors/favorite-selector';
import { useMyFilms } from '../../hooks/use-my-films';


function MyList(): JSX.Element {
  const isDataLoading = useAppSelector(getIsMyFilmsLoading);
  const {myFilms} = useMyFilms();

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo styleType='normal'/>

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{myFilms.length}</span>
        </h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {(isDataLoading) ? <LoadingBlock /> :
          <FilmList films={myFilms} />}

      </section>

      <Footer />
    </div>
  );
}
export default MyList;
