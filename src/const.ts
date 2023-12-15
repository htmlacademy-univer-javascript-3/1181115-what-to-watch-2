export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
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
  MyFilms ='/favorite',
  Login = '/login',
  Logout ='/logout'
}
