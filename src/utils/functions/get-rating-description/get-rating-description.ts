import { RatingDescription } from '../../../consts';
import { GetRatingDescriptionFunc } from '../../../types/types';

export const getRatingDescription: GetRatingDescriptionFunc = (rating:number) => {
  if (rating >= 0 && rating < 3){
    return RatingDescription.Bad;
  } else if (rating >= 3 && rating < 5){
    return RatingDescription.Normal;
  } else if (rating >= 5 && rating < 8) {
    return RatingDescription.Good;
  } else if (rating >= 8 && rating < 10) {
    return RatingDescription.VeryGood;
  } else if (rating === 10){
    return RatingDescription.Awesome;
  } else {
    return '';
  }
};
