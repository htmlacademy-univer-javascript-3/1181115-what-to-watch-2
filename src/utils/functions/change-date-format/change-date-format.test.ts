import { changeDateFormat } from './change-date-format';

describe('Function: changeDateFormat', () => {
  it('should return data in format: Full month day, year', () => {
    expect(changeDateFormat('2023-12-03T21:00:00')).toEqual('December 3, 2023');
  });
});
