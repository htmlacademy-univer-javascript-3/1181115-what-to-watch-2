import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type LogoProps = {
  styleType: string;
};

function Logo({styleType}:LogoProps): JSX.Element {

  const typeStyles = {
    lightening: 'logo__link--light',
    normal: '',
  }[styleType] as string;

  return (
    <div className="logo">
      <Link className={`logo__link ${typeStyles}`} to={AppRoute.Root}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
