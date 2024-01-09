import { getRatingLevel } from './get-rating-description';
import { RatingLevel } from '../../../consts';

describe('Function: getRatingLevel', () => {
  it('should return Bad in range [0; 3)', () => {
    expect(getRatingLevel(0)).toEqual(RatingLevel.Bad);
    expect(getRatingLevel(2.99)).toEqual(RatingLevel.Bad);
  });

  it('should return Normal in range [3; 5)', () => {
    expect(getRatingLevel(3)).toEqual(RatingLevel.Normal);
    expect(getRatingLevel(4.99)).toEqual(RatingLevel.Normal);
  });

  it('should return Good in range [5; 8)', () => {
    expect(getRatingLevel(5)).toEqual(RatingLevel.Good);
    expect(getRatingLevel(7.99)).toEqual(RatingLevel.Good);
  });

  it('should return Very Good in range [8; 10)', () => {
    expect(getRatingLevel(8)).toEqual(RatingLevel.VeryGood);
    expect(getRatingLevel(9.99)).toEqual(RatingLevel.VeryGood);
  });

  it('should return Awesome in case of 10', () => {
    expect(getRatingLevel(10)).toEqual(RatingLevel.Awesome);
  });

  it('should return an empty line if value more then 10 or the value is negative', () => {
    expect(getRatingLevel(-1)).toEqual('');
    expect(getRatingLevel(11)).toEqual('');
  });
});
