import { getHalfArray } from './get-half-array';
import { generateFilmReviewArr } from '../../mock-data';

describe('Function: getHalfArray', () => {
  it('should return the index of the element just before the middle of an odd-length array', () => {
    let filmReviews = generateFilmReviewArr(5);
    expect(getHalfArray(filmReviews)).toEqual(2);

    filmReviews = generateFilmReviewArr(11);
    expect(getHalfArray(filmReviews)).toEqual(5);
  });

  it('should return the index of the last element of the first half of an even-length array', () => {
    let filmReviews = generateFilmReviewArr(8);
    expect(getHalfArray(filmReviews)).toEqual(3);

    filmReviews = generateFilmReviewArr(32);
    expect(getHalfArray(filmReviews)).toEqual(15);
  });
});
