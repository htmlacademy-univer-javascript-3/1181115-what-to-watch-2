import { checkEmail } from './check-email';

describe('Function: checkEmail', () => {
  it('should return true if email is correct', () => {
    expect(checkEmail('ermolaeva@gmail.com')).toBe(true);
    expect(checkEmail('ermolaeva_557@ya.ru')).toBe(true);
    expect(checkEmail('_21ermolaeva@gmail.com')).toBe(true);
  });

  it('should return false if email is incorrect', () => {
    expect(checkEmail('ermolaeva@.com')).toBe(false);
    expect(checkEmail('ermolaeva@ya')).toBe(false);
    expect(checkEmail('ermolaeva.com')).toBe(false);
    expect(checkEmail('ermolaeva@')).toBe(false);
    expect(checkEmail('22ermolaeva@.com')).toBe(false);
  });
});

