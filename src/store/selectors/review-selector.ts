import { NameSpace } from '../../const';
import { UserComment } from '../../types';
import { State } from '../state';

export const getUserComments = (state: Pick<State, NameSpace.Review>): UserComment[] => state[NameSpace.Review].userComments;
export const getIsCommentsLoading = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isCommentsLoading;
