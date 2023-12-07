export type Film = {
  id: number;
  filmName: string;
  genre: string;
  filmReleaseDate: number;
  filmImg: string;
};

export type Films = Film[];

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
