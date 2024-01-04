import { useRef, FormEvent, useState, useEffect } from 'react';
import AuthMessage from '../../components/auth-message/auth-message';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions/api-user-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Logo from '../../components/logo/logo';
import { getIsAuth } from '../../store/selectors/user-selector';


const EMAIL_TEMPLATE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const LOGIN_TEMPLATE = /(([a-zA-Z].*\d)|(\d.*[a-zA-Z]))/;


function isLoginValid(login: string){
  return (
    login !== '' &&
    login !== null &&
    login.match(EMAIL_TEMPLATE)
  );
}

function isPasswordValid(password: string){
  return (
    password !== '' &&
    password !== null &&
    (password.match(LOGIN_TEMPLATE))
  );
}

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getIsAuth);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [messageError, setMessageError] = useState<string>('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const loginValid = isLoginValid(loginRef.current.value);
      const passwordValid = isPasswordValid(passwordRef.current.value);

      if (!loginValid){
        setMessageError('Please enter a valid email address');
      } else if (!passwordValid) {
        setMessageError('Please enter a valid password');
      } else {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        }));
      }

    }
  };

  useEffect(()=>{
    if (authStatus === AuthorizationStatus.Auth){
      navigate(AppRoute.Root);
    }
  }, [authStatus, navigate]);


  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo styleType='normal'/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <AuthMessage message={messageError}/>

          <div className="sign-in__fields">
            <div className="sign-in__field">
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
            <div className="sign-in__field">
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
              className="sign-in__btn"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
