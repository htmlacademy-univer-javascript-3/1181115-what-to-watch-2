export enum AppRoutes {
  Main ='/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '*',
}

export enum AuthorisationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const VIDEO_TIMEOUT = 1000;

export const TABS = ['Overview', 'Details', 'Reviews'];

export enum RatingDescription {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export enum GenresEnum {
  AllGenres = 'All genres',
  Comedies = 'Comedy',
  Crime = 'Crime',
  Drama = 'Drama',
  Thriller = 'Thriller',
  Action = 'Action',
  Adventure = 'Adventure',
  Horror = 'Horror',
  Documentary = 'Documentary',
  KidsAndFamily = 'Kids & Family',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
}

export const MAX_NUM_FILMS = 8;

export const NUM_SIMILAR_FILM = 3;

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const MAX_NUM_GENRES = 10;

export const MAX_NUM_SIMILAR_FILM = 4;

export const enum ReviewConsts {
  MinLength = 50,
  MaxLength = 400
}

export enum NameSpace {
  User = 'USER',
  Film = 'FILM',
  Films = 'FILMS',
  MyList = 'MY_LIST',
}

export enum FavoriteFilmStatus {
  AddToFavorite = 1,
  RemoveFromFavorite = 0,
}

export enum VideoPlayerConsts {
  MaxProgressValue = 100,
  MinProgressValue = 0
}

export enum FilmCardSize {
  Width = '280',
  Height = '175'
}

export const NUM_RATING_STAR = 10;
