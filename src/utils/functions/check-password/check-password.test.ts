import { checkPassword } from './check-password';

describe('Function: checkPassword', () => {
  it('it should return true if the password consists of at least one letter and a number', () => {
    expect(checkPassword('a5')).toBe(true);
    expect(checkPassword('abvg6665')).toBe(true);
    expect(checkPassword('123AbD665')).toBe(true);
  });

  it('it should return false if the password is less than two characters long', () => {
    expect(checkPassword('a')).toBe(false);
    expect(checkPassword('7')).toBe(false);
  });

  it('it should return false if the password does not contain at least one letter', () => {
    expect(checkPassword('123456')).toBe(false);
  });

  it('it should return false if there is not at least one digit in the password', () => {
    expect(checkPassword('abvDfe')).toBe(false);
  });
});
