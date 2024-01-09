import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumb-list';
import { withHistory } from '../../../utils/mock-component';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const mockData = {
      id: 'Aspdpddpkfdv',
      filmTitle: 'The Grand Budapest Hotel',
    };

    const preparedComponent = withHistory(<Breadcrumbs id={mockData.id} filmTitle={mockData.filmTitle} />);
    render(preparedComponent);

    expect(screen.getByText(mockData.filmTitle)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});

