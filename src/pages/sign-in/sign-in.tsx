import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderLogo from '../../components/header/header-logo/header-logo';
import SignInField from '../../components/sign-in-field/sign-in-field';
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const authorisationStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    if (authorisationStatus === AuthorisationStatus.Auth) {
      navigate(AppRoutes.Main);
    }
  }, [authorisationStatus, navigate]);

  const handleSignInBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkPassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsEmailError(false);
      setIsPasswordError(false);
      dispatch(loginAction({ login: email, password }));

      toast.success('You are logged in!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (isEmailValid || email === '') {
      setIsEmailError(false);
      setIsPasswordError(true);
    } else if (isPasswordValid || password === '') {
      setIsPasswordError(false);
      setIsEmailError(true);
    } else {
      setIsEmailError(true);
      setIsPasswordError(true);
    }
  };

  const showMessage = () => {
    if (isEmailError && isPasswordError && email !== '' && password !== '') {
      return 'email address and password';
    } else if (isEmailError && email !== '') {
      return 'email address';
    } else if (isPasswordError && password !== '') {
      return 'password';
    } else {
      return '';
    }
  };

  const message = showMessage();

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
            <SignInField
              type="email"
              placeholder="Email address"
              name="user-email"
              id="user-email"
              value={email}
              onChangeHandler={setEmail}
              htmlFor="user-email"
              label="Email address"
              errorClass={
                isEmailError && email !== '' ? 'sign-in__field--error' : ''
              }
            />

            <SignInField
              type="password"
              placeholder="Password"
              name="user-password"
              id="user-password"
              value={password}
              onChangeHandler={setPassword}
              htmlFor="user-password"
              label="Password"
              errorClass={
                isPasswordError && password !== ''
                  ? 'sign-in__field--error'
                  : ''
              }
            />
          </div>
          <div className="sign-in__submit">
            <button
              data-testid="sign-in-btn"
              className="sign-in__btn"
              type="submit"
              onClick={(e) => handleSignInBtnClick(e)}
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
