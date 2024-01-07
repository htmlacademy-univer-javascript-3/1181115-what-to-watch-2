const TOKEN_KEY = 'wtw-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

