import { checkEmailFunc } from '../../../types/types';

export const checkEmail: checkEmailFunc = (email) => {
  const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (email.match(regexp)){
    return true;
  } else {
    return false;
  }
};
