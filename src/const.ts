export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '/page-not-found',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum FilmPageTab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews ='Reviews',
}

export enum APIRoute {
  Films = '/films',
  PromoFilm = '/promo',
  SimilarFilms = '/films/:id/similar',
  FullFilm = '/films/:id',
  MyFilms ='/favorite',
  Login = '/login',
  Logout ='/logout',
  ChangeFilmStatus ='/favorite/:id/:status',
  UserComments ='/comments/:id',
}

export enum NameSpace {
  Film = 'FILM',
  Films = 'FILMS',
  User = 'USER',
  MyFilms = 'FAVORITE_FILMS',
  Review = 'REVIEW',
}

export enum RatingLevel {
  Awesome ='Awesome',
  VeryGood = 'Very Good',
  Good = 'Good',
  Normal = 'Normal',
  Bad = 'Bad',
}
