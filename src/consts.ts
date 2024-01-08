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

export enum RatingLevel {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const enum ReviewLimits {
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

export const TABS = ['Overview', 'Details', 'Reviews'];

export const NUM_RATING_STAR = 10;

export const MAX_NUM_GENRES = 10;

export const MAX_NUM_SIMILAR_FILM = 4;

export const MAX_PEOPLE = 4;

export const VIDEO_TIMEOUT = 1000;
