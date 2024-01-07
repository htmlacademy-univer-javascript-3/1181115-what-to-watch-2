import { SignInFieldProps } from '../../types/types';

function SignInField(props: SignInFieldProps) {
  return (
    <div className={`sign-in__field ${props.errorClass}`}>
      <input
        className='sign-in__input'
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChangeHandler(e.target.value)}
        data-testid='sign-in-input'
      />
      <label className='sign-in__label visually-hidden' htmlFor={props.htmlFor}>
        {props.label}
      </label>
    </div>
  );
}

export default SignInField;
