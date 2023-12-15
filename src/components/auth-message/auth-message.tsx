type MessageProps = {
  message: string;
};


function AuthMessage({message}: MessageProps): JSX.Element | null {

  return (message)
    ? (
      <div className="sign-in__message">
        <p>{message}</p>
      </div>
    )
    : null;
}

export default AuthMessage;
