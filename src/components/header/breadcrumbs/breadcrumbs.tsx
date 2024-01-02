import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';


interface BreadcrumbsProps {
  id: string;
  name: string;
}

export default function Breadcrumbs({id, name}: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={AppRoute.Film.replace(':id', id)} className="breadcrumbs__link">
            {name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={AppRoute.AddReview.replace(':id', id)}>
            Add review
          </Link>
        </li>
      </ul>
    </nav>
  );
}
