import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';


type PrivateRootProps = {
  children: JSX.Element;
};

function PrivateRoot({children}: PrivateRootProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);

  return authStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoot;
