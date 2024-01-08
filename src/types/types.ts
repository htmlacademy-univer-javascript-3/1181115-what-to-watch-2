import { ReactNode } from 'react';
import type { BrowserHistory } from 'history';

export type FilmCardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
};

export type FilmCardStateProps = FilmCardProps & {
  active: boolean;
  onFilmCardMouseEvent: React.Dispatch<React.SetStateAction<string | null>>;
};

// export type FilmReviews = {
//   id: string | number;
//   text: string;
//   author: string;
//   date: string;
//   rating: string;
// };

export type PropsList<T> = {
  list: T[];
};

export type HeaderProps = {
  linkLogo: string;
  children?: ReactNode;
  classes?: string;
};

export type FooterProps = HeaderProps;

export type FilmPosterProps = {
  imgSrc: string;
  imgTitle: string;
  classes?: string;
};

export type RatingStarProps = RatingProps & {
  id: string;
};

export type BreadcrumbsProps = {
  id: string;
  filmTitle: string;
}

export type PrivateRouteProps = {
  children: JSX.Element;
};

export type FilmCardBgProps = {
  img: string;
  filmTitle: string;
};

export type VideoPlayerProps = {
  active: boolean;
  src: string;
  img: string;
  filmTitle: string;
  videoTimeout: number;
  width?: string;
  height?: string;
};

export type AddActiveClassFunc = (idx: number, activeClass: string) => string;

export type TabsNavProps = {
  tabs: string[];
  onTabClick: React.Dispatch<React.SetStateAction<number>>;
  onActiveClassAdd: AddActiveClassFunc;
};

export type FilmTabsContainerProps = {
  activeTab: number;
};

export type AddToListButtonProps = {
  film: FullFilm | PromoFilm | FilmCardProps;
};

export type PlayButtonProps = {
  filmId: string;
};

export type GetRatingLevelFunc = (rating:number) => string;


export type ShowMoreButtonProps = {
  onShowMoreClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export type PromoFilm = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  videoLink: string;
  genre: string;
  released: number;
  isFavorite: boolean;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
};

export type AuthData = {
  login: string;
  password: string;
};

export type checkEmailFunc = (email: string) => boolean;

export type checkPasswordFunc = (password: string) => boolean;

export type AuthErrorProps = {
  message: string;
};

export type FullFilm = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
};

export type UserComment = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
};

export type SentComment = {
  id: string;
  comment: string;
  rating: number;
}

export type RatingProps = {
  onRatingChange: React.Dispatch<React.SetStateAction<number>>;
  isChecked: boolean | undefined;
  readOnly: boolean;
};

export interface HistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}
