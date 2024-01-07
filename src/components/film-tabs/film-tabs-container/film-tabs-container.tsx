import Details from '../../about-film/details/details';
import Overview from '../../about-film/overview/overview';
import Reviews from '../../about-film/reviews/reviews';
import { FilmTabsContainerProps } from '../../../types/types';

function FilmTabsContainer({ activeTab }:FilmTabsContainerProps) {
  switch (activeTab){
    case 0:
      return <Overview />;
    case 1:
      return <Details />;
    case 2:
      return <Reviews />;
    default:
      return <Overview />;
  }
}

export default FilmTabsContainer;

