import { useEffect } from 'react';
import Header from '../../components/header/header';
import LoadingBlock from '../../components/loading-block/loading-block';
import MemoFilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import { AppRoutes, AuthorisationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCountFilmsInMyList, getFilmsInMyList, getLoadingState } from '../../store/my-list/selectors';
import { getAuthStatus } from '../../store/user/selectors';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';

function MyList() {
  const dispatch = useAppDispatch();
  const filmsInMyList = useAppSelector(getFilmsInMyList);
  const isLoading = useAppSelector(getLoadingState);
  const countFilmsInMyList = useAppSelector(getCountFilmsInMyList);
  const authorisationStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    if (authorisationStatus === AuthorisationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorisationStatus, dispatch]);

  return (
    <div className="user-page">
      <Header linkLogo={AppRoutes.Main} classes='user-page__head'>
        <h1 className="page-title user-page__title">
          My list
          <span className="user-page__film-count">{countFilmsInMyList}</span>
        </h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          { isLoading && <LoadingBlock /> }
          <MemoFilmsList list={filmsInMyList}/>
        </div>
      </section>

      <Footer linkLogo={AppRoutes.Main} />
    </div>
  );
}

export default MyList;
