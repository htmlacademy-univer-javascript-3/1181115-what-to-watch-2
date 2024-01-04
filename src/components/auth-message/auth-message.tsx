import { useAppSelector } from '../../hooks';
import { getUserError } from '../../store/selectors/user-selector';

type MessageProps = {
  message: string;
};


function AuthMessage({message}: MessageProps): JSX.Element | null {
  const error = useAppSelector(getUserError);

  const showedMessage = message || error;

  return (showedMessage)
    ? (
      <div className="sign-in__message">
        <p>{showedMessage}</p>
      </div>
    )
    : null;
}

export default AuthMessage;
