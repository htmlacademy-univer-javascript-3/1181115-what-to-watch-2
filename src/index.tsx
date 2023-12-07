import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import { MyFilmList } from './mocs/my-list';
import {store} from './store/index';


const mockData = {
  id: Math.floor(Math.random() * 10),
  filmName: 'The Grand Budapest Hotel',
  genre: 'Drama',
  filmReleaseDate: 2004,
  filmImg: 'img/bg-the-grand-budapest-hotel.jpg',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App myFilmList={MyFilmList} { ...mockData} />
    </Provider>
  </React.StrictMode>
);
