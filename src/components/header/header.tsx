import UserBlock from '../user-block/user-block';
import Logo from '../logo/logo';


function Header() {
  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Logo styleType='off'/>
      </div>

      <UserBlock />
    </header>
  );
}

export default Header;
