import HeaderLogo from './header-logo/header-logo';
import HeaderUserBlock from './header-user-block/header-user-block';
import HeadGuest from './header-guest/header-guest';
import { HeaderProps } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { AuthorisationStatus } from '../../consts';
import { getAuthStatus } from '../../store/user/selectors';

function Header({linkLogo, children, classes}:HeaderProps){
  const authorisationStatus = useAppSelector(getAuthStatus);

  return(
    <header className={`page-header ${classes === undefined ? '' : classes}`}>
      <HeaderLogo linkLogo={linkLogo} />
      {children}
      {
        authorisationStatus === AuthorisationStatus.Auth
          ? <HeaderUserBlock />
          : <HeadGuest />
      }
    </header>
  );
}

export default Header;
