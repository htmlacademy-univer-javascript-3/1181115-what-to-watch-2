import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {FilmsList} from './mocs/films-list'
import { MyList } from './mocs/my-list';


const mockData = {
  id: Math.random(),
  filmName: 'The Grand Budapest Hotel',
  filmGenre: 'Drama',
  filmReleaseDate: 2004,
  filmImg: 'img/bg-the-grand-budapest-hotel.jpg',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App list={FilmsList} myList={MyList} { ...mockData} />
  </React.StrictMode>
);
