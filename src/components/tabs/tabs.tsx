import { Link, useLocation } from 'react-router-dom';


type TabsProp ={
  tabs: string[];
}

function Tabs({tabs}: TabsProp){
  const location = useLocation();

  const pages = tabs.map((t)=>({label: t, href: `#${t}`}));
  const activePage = location.hash || pages[0].href;

  return(
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {
          pages.map(((page)=>(
            <li
              key={page.href}
              className={`film-nav__item ${page.href === activePage ? 'film-nav__item--active' : ''}`}
            >
              <Link to={page.href} className="film-nav__link">{page.label}</Link>
            </li>
          )))
        }
      </ul>
    </nav>
  );
}

export default Tabs;
