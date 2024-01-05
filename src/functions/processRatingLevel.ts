import { RatingLevel } from '../const';

export const processRatingLevel = (rating = 0) => {
  if (rating >= 10) {
    return RatingLevel.Awesome;
  } else if (rating >= 8) {
    return RatingLevel.VeryGood;
  } else if (rating >= 5) {
    return RatingLevel.Good;
  } else if (rating >= 3) {
    return RatingLevel.Normal;
  }
  return RatingLevel.Bad;
};
