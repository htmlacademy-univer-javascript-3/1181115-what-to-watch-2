import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <div className="logo">
      <Link className="logo__link logo__link--light" to={AppRoute.Root}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
