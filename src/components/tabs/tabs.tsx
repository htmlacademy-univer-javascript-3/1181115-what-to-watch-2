import { Link } from 'react-router-dom';
import { TextLink } from '../../types';


type TabsProp ={
  tabs: TextLink[];
  onTabChange: (e:number)=> void;
  activeTab: number;
}

function Tabs({tabs, onTabChange, activeTab}: TabsProp){

  return(
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {
          tabs.map(((tab, i)=>(
            <li
              key={tab.text}
              className={`film-nav__item ${i === activeTab ? 'film-nav__item--active' : ''}`}
              onClick={()=>onTabChange(i)}
            >
              <Link to="#" className="film-nav__link">{tab.text}</Link>
            </li>
          )))
        }
      </ul>
    </nav>
  );
}

export default Tabs;
