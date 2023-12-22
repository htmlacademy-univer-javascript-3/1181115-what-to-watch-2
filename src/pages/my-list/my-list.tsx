import { useAppDispatch, useAppSelector } from '../../hooks';

import Footer from '../../components/footer/footer';
import FilmList from '../../components/film-list/film-list';
import LoadingBlock from '../../components/loading-block/loading-block';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import { useEffect } from 'react';
import { fetchMyFilmsAction } from '../../store/api-actions/api-film-actions';


function MyList(): JSX.Element {
  const isDataLoading = useAppSelector((state) => state.films.isDataLoading);
  const myFilms = useAppSelector((state) => state.films.myFilms);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchMyFilmsAction());
  },[]);

  return (
    (isDataLoading) ? <LoadingBlock /> :
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

          <div className="catalog__films-list">
            <FilmList films={myFilms} />
          </div>
        </section>

        <Footer />
      </div>
  );
}

export default MyList;
