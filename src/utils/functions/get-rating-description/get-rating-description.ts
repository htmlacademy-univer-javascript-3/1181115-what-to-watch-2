import { RatingLevel } from '../../../consts';
import { GetRatingLevelFunc } from '../../../types/types';

export const getRatingLevel: GetRatingLevelFunc = (rating:number) => {
  if (rating >= 0 && rating < 3){
    return RatingLevel.Bad;
  } else if (rating >= 3 && rating < 5){
    return RatingLevel.Normal;
  } else if (rating >= 5 && rating < 8) {
    return RatingLevel.Good;
  } else if (rating >= 8 && rating < 10) {
    return RatingLevel.VeryGood;
  } else if (rating === 10){
    return RatingLevel.Awesome;
  } else {
    return '';
  }
};
