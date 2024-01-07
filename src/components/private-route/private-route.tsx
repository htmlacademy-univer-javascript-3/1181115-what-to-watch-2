import {Navigate} from 'react-router-dom';
import { PrivateRouteProps } from '../../types/types';
import { AppRoutes, AuthorisationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user/selectors';

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    <>
      {authorizationStatus === AuthorisationStatus.Auth && children}
      {authorizationStatus === AuthorisationStatus.NoAuth && <Navigate to={AppRoutes.Login} />}
    </>
  );
}

export default PrivateRoute;
