import { AuthErrorProps } from '../../types/types';

function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="sign-in__message">
      <p data-testid='error-message' >{message}</p>
    </div>
  );
}

export default AuthError;
