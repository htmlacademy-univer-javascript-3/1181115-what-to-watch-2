import './not-found.css';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts';

function NotFound(){
  return (
    <div className='not-found-container'>
      <h1 className='not-found-title'>404</h1>
      <p className='not-found-message'>
        Ooops...<br/>
      </p>
      <Link to={AppRoutes.Main} className='not-found-btn' data-testid='not-found-btn'>TO HOME PAGE</Link>
    </div>
  );
}

export default NotFound;
