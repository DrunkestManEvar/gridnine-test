const ShowMoreButton = ({ handleClick, isDisabled }) => {
  return (
    <button
      className={`show-more-button ${
        isDisabled ? 'show-more-button--disabled' : ''
      }`}
      onClick={handleClick}>
      Показать еще
    </button>
  );
};

export default ShowMoreButton;
