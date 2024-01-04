import { NameSpace } from '../../const';
import { UserComment } from '../../types';
import { State } from '../state';

export const getUserComments = (state: Pick<State, NameSpace.Review>): UserComment[] => state[NameSpace.Review].userComments;
export const getIsAuth = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].authorizationStatus;
