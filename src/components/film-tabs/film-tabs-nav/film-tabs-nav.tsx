import { TabsNavProps } from '../../../types/types';
import './film-tabs-nav.css';

function FilmTabsNav({ tabs, onTabClick, onActiveClassAdd }: TabsNavProps) {
  return (
    <nav className="film-nav film-card__nav" data-testid="film-card-nav">
      <ul className="film-nav__list">
        {tabs.map((tab, idx) => (
          <li
            role="tab"
            className={`film-nav__item tab-hover ${onActiveClassAdd(idx, 'film-nav__item--active')}`}
            key={`tab-${tab}`}
          >
            <a className="film-nav__link" onClick={() => onTabClick(idx)}>
              {tab}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FilmTabsNav;
