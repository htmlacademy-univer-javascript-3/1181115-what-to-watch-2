import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';


type PrivateProps = {
  children: React.ReactNode;
};

function PrivateRoot({ children }: PrivateProps): React.ReactNode {
  const hasAccess = false;

  return (hasAccess ? children : <Navigate to={AppRoute.Login} />);
}

export default PrivateRoot;
