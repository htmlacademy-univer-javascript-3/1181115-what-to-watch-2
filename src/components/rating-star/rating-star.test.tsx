import { render, screen } from '@testing-library/react';
import RatingStar from './rating-star';

describe('Component: RatingStar', () => {
  it('should render correct', () => {
    const handleInputOnChange = vi.fn();

    render(
      <RatingStar
        id="01"
        onRatingChange={handleInputOnChange}
        isChecked={false}
        readOnly={false}
      />
    );

    expect(screen.getByLabelText('Rating 01')).toBeInTheDocument();
  });
});
