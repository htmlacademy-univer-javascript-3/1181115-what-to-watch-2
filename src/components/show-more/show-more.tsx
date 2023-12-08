type Props = {
  onClickMore: () => void;
}


function ShowMore({onClickMore}: Props): JSX.Element {

  return (
    <div className="catalog__more">
      <button onClick={onClickMore} className="catalog__button" type="button" >
        Show more
      </button>
    </div>
  );
}

export default ShowMore;
