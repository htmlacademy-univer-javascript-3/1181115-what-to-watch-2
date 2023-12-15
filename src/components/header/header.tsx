import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import UserBlock from '../user-block/user-block';


function Header() {
  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link className="logo__link" to={AppRoute.Root}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <UserBlock />
    </header>
  );
}

export default Header;
