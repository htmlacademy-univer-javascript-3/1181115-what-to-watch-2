import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderLogo from '../../components/header/header-logo/header-logo';
import AuthError from '../../components/auth-error/auth-error';
import Footer from '../../components/footer/footer';
import { AppRoutes, AuthorisationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { checkEmail } from '../../utils/functions/check-email/check-email';
import { checkPassword } from '../../utils/functions/check-password/check-password';
import { getAuthStatus } from '../../store/user/selectors';


function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getAuthStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleSignInSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const isEmailValid = checkEmail(loginRef.current.value);
      const isPasswordValid = checkPassword(passwordRef.current.value);

      if (isEmailValid && isPasswordValid) {
        setIsEmailError(false);
        setIsPasswordError(false);
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        }));

        toast.success('You are logged in!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      } else if (!isEmailValid) {
        setMessage('Please enter a valid email address');
        setIsEmailError(true);
        setIsPasswordError(false);
      } else if (!isPasswordValid) {
        setMessage('Please enter a valid password');
        setIsPasswordError(true);
        setIsEmailError(false);
      }
    }
  };

  useEffect(() => {
    if (authStatus === AuthorisationStatus.Auth) {
      navigate(AppRoutes.Main);
    }
  }, [authStatus, navigate]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <HeaderLogo linkLogo={AppRoutes.Main} />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          {message !== '' && <AuthError message={message} />}
          <div className="sign-in__fields">
            <div className={`sign-in__field ${isEmailError ? 'sign-in__field--error' : ''}`}>
              <input
                ref={loginRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className={`sign-in__field ${isPasswordError ? 'sign-in__field--error' : ''}`}>
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              data-testid="sign-in-btn"
              className="sign-in__btn"
              type="submit"
              onClick={(e) => handleSignInSubmit(e)}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer linkLogo={AppRoutes.Main} />
    </div>
  );
}

export default SignIn;
