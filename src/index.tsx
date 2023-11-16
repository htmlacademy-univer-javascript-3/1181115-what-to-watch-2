import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {FilmsList} from './mocs/films-list'
import { MyFilmList } from './mocs/my-list';


const mockData = {
  id: Math.floor(Math.random() * 10),
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
    <App list={FilmsList} myFilmList={MyFilmList} { ...mockData} />
  </React.StrictMode>
);
