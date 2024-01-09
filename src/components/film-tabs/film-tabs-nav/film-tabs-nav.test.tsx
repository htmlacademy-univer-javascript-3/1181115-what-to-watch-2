import { render, screen } from '@testing-library/react';
import FilmTabsNav from './film-tabs-nav';
import { TABS } from '../../../consts';

describe('Component: FilmTabsNav', () => {
  it('should render correctly', () => {
    const handleBtnOnClick = vi.fn();
    const addActiveClassFn = vi.fn();

    render(
      <FilmTabsNav
        tabs={TABS}
        onTabClick={handleBtnOnClick}
        onActiveClassAdd={addActiveClassFn}
      />
    );

    expect(screen.getAllByRole('tab').length).toBe(TABS.length);
  });
});
