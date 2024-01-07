import { ShowMoreButtonProps } from '../../../types/types';

function ShowMoreButton({onShowMoreClick}: ShowMoreButtonProps) {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={onShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreButton;
