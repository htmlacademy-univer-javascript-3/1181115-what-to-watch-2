import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';


function NotFoundPage(): JSX.Element {
  return (
    <>
      <section className="film-card">
        <Header />
      </section>

      <div className="page-content ">
        <section className="catalog">
          <h2 className="catalog__title ">404 Не найдено</h2>
          <Link className="film-nav__link" to="/">Вернуться на главную</Link>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default NotFoundPage;
