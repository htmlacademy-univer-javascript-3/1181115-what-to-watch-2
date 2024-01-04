import { NameSpace } from '../../const';
import { UserData } from '../../types';
import { State } from '../state';

export const getIsAuthLoading = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].isAuthLoading;
export const getIsAuth = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].authorizationStatus;
export const getUserError = (state: Pick<State, NameSpace.User>): string |null => state[NameSpace.User].error;
export const getUserData = (state: Pick<State, NameSpace.User>): UserData => state[NameSpace.User].user;
