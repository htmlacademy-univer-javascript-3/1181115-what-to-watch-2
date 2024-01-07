import { Link } from 'react-router-dom';
import { HeaderProps } from '../../../types/types';

function HeaderLogo({linkLogo}:HeaderProps){
  return(
    <div className="logo" data-testid='logo'>
      <Link to={linkLogo} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default HeaderLogo;
