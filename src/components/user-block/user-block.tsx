import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions/api-user-actions';
import { getIsAuth, getUserData } from '../../store/selectors/user-selector';


function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(getUserData);
  const authStatus = useAppSelector(getIsAuth);

  const handleLogoutClick = () =>{
    dispatch(logoutAction());
  };

  return authStatus === AuthorizationStatus.Auth ?
    (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={() => navigate(AppRoute.MyList)}>
            <img
              src={user?.avatarUrl || ''}
              alt={user?.name || ''}
              width="63"
              height="63"
            />
          </div>
        </li>
        <li className="user-block__item">
          <Link
            to={AppRoute.Root}
            onClick={handleLogoutClick}
            className="user-block__link"
          >
            Sign out
          </Link>
        </li>
      </ul>
    ) : (
      <div className="user-block">
        <Link
          to={AppRoute.Login}
          className="user-block__link"
        >
          Sign in
        </Link>
      </div>
    );
}

export default UserBlock;
