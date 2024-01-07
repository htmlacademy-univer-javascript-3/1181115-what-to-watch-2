import { useState } from 'react';
import FilmTabsNav from './film-tabs-nav/film-tabs-nav';
import FilmTabsContainer from './film-tabs-container/film-tabs-container';
import { TABS } from '../../consts';
import { AddActiveClassFunc } from '../../types/types';

function FilmTabs() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const addActiveClass: AddActiveClassFunc = (idx, activeClass) =>
    activeTab === idx ? activeClass : '';

  return (
    <>
      <FilmTabsNav
        tabs={TABS}
        onTabClick={setActiveTab}
        onActiveClassAdd={addActiveClass}
      />
      <FilmTabsContainer activeTab={activeTab} />
    </>
  );
}

export default FilmTabs;
