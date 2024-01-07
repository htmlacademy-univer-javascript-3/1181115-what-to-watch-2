import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../consts';

function HeaderGuest() {
  return (
    <div className="user-block">
      <Link to={AppRoutes.Login} className="user-block__link">
        Sign in
      </Link>
    </div>
  );
}

export default HeaderGuest;
