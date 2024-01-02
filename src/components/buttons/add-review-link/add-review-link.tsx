import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { AppRoute, AuthorizationStatus } from '../../../const.ts';


interface AddReviewLinkProps {
  id: string;
}

export default function AddReviewLink({ id }: AddReviewLinkProps) {
  const { authorizationStatus } = useAppSelector((state) => state.user);

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <Link
      to={AppRoute.AddReview.replace(':id', id)}
      className="btn film-card__button"
    >
      Add review
    </Link>
  ) : null;
}
