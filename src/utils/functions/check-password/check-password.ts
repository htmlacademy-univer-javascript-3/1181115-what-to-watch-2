import { checkPasswordFunc } from '../../../types/types';

export const checkPassword: checkPasswordFunc = (password) => {
  const regex = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/);

  if (password.match(regex)) {
    return true;
  } else {
    return false;
  }
};
