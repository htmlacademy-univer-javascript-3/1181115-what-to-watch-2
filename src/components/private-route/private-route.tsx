import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getToken } from '../../api/token';
import { getIsAuth } from '../../store/selectors/user-selector';


type PrivateRootProps = {
  children: JSX.Element;
};

function PrivateRoot({children}: PrivateRootProps): JSX.Element {
  const authStatus = useAppSelector(getIsAuth);

  return authStatus === AuthorizationStatus.Auth || getToken() !== ''
    ? (
      children
    ) : (
      <Navigate to={AppRoute.Login} />
    );
}

export default PrivateRoot;
