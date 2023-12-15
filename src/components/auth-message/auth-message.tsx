import { useAppSelector } from '../../hooks';

type MessageProps = {
  message: string;
};


function AuthMessage({message}: MessageProps): JSX.Element | null {
  const error = useAppSelector((state)=> state.user.error);

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
