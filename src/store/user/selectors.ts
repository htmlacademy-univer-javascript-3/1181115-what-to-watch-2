import { NameSpace } from '../../consts';
import { State } from '../../types/state';
import { AuthorisationStatus } from '../../consts';
import { UserData } from '../../types/types';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthorisationStatus => state[NameSpace.User].authorisationStatus;

export const getUserInfo = (state: Pick<State, NameSpace.User>): UserData => state[NameSpace.User].user;
