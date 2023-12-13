export type Film = {
  id: number;
  name: string;
  genre: string;
  previewVideoLink: string;
  previewImage: string;
};

export type Films = Film[];

export type PromoFilm = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type Review ={
  id: number;
  text: string;
  ratingScore: number;
  author: string;
  date: string;
};

export type FullFilm ={
  id: number;
  filmName: string;
  genre: string;
  filmReleaseDate: number;
  filmImg: string;
  filmPoster: string;
  runTime: string;
  ratingScore: number;
  ratingLevel: string;
  ratingCount: number;
  description: string;
  director: string;
  starring: string[];
  reviews: Review[];
  moreLikeThis: Film[];
};

export type TextLink={
  link: string;
  text: string;
};
