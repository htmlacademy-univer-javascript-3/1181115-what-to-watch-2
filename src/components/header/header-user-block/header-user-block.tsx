import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { logoutAction } from '../../../store/api-actions';
import { AppRoutes } from '../../../consts';
import { getUserInfo } from '../../../store/user/selectors';

function HeaderUserBlock() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserInfo);
  const navigate = useNavigate();

  const handleSignOutLinkClick = () => {
    dispatch(logoutAction());

    toast.success('You are logged out of your account!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
  };

  const handleAvatarClick = () => {
    navigate(AppRoutes.MyList);
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img
            onClick={handleAvatarClick}
            src={user.avatarUrl}
            alt="User avatar"
            width="63"
            height="63"
            data-testid='user-avatar'
          />
        </div>
      </li>
      <li className="user-block__item">
        <a
          className="user-block__link"
          onClick={handleSignOutLinkClick}
          data-testid='sign-out-btn'
        >
          Sign out
        </a>
      </li>
    </ul>
  );
}

export default HeaderUserBlock;
