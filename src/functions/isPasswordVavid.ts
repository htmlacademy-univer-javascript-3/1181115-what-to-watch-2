const PASS_TEMPLATE = /(([a-zA-Z].*\d)|(\d.*[a-zA-Z]))/;

export function isPasswordValid(password: string){
  return (
    password !== '' &&
    password !== null &&
    (password.match(PASS_TEMPLATE))
  );
}
