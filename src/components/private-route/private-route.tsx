import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getToken } from '../../api/token';


type PrivateRootProps = {
  children: JSX.Element;
};

function PrivateRoot({children}: PrivateRootProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);

  return authStatus === AuthorizationStatus.Auth || getToken() !== ''
    ? (
      children
    ) : (
      <Navigate to={AppRoute.Login} />
    );
}

export default PrivateRoot;
