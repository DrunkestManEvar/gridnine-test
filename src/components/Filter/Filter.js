const Filter = ({ type, title, options, hasLargeMarginBottom }) => {
  const filterInputs = {
    sortBy: () => {
      return options.map((option, index) => {
        return (
          <div key={`${option}-${index}`} className='filter__option'>
            <input
              type='radio'
              name={type}
              id={`${type}-${index}`}
              className='filter__input'
            />
            <label htmlFor={`${type}-${index}`}> - {option}</label>
          </div>
        );
      });
    },
    isDirectFlight: () => {
      return options.map((option, index) => {
        return (
          <div key={`${option}-${index}`} className='filter__option'>
            <input
              type='checkbox'
              name={type}
              id={`${type}-${index}`}
              className='filter__input'
            />
            <label htmlFor={`${type}-${index}`}> - {option}</label>
          </div>
        );
      });
    },
    price: () => {
      return options.map((option, index) => {
        return (
          <div key={`${option}-${index}`} className='filter__option--large-mb'>
            <label htmlFor={`${type}-${index}`} className='filter__label--mr'>
              {option}
            </label>
            <input
              type='text'
              placeholder={index === 0 ? '0' : '10000'}
              className='filter__input'
            />
          </div>
        );
      });
    },
    airlineName: () => {
      return options.map((option, index) => {
        const labelText =
          option.airline.length > 19
            ? option.airline.slice(0, 14) + '...'
            : option.airline;

        return (
          <div key={`${option}-${index}`} className='filter__option'>
            <input
              type='checkbox'
              name={type}
              id={`${type}-${index}`}
              className='filter__input'
            />
            <label
              htmlFor={`${type}-${index}`}
              className='filter__label--airline'>
              {' '}
              <span>- {labelText}</span>
              <span>от {option.price} р.</span>
            </label>
          </div>
        );
      });
    }
  };

  return (
    <div className={`filter ${hasLargeMarginBottom ? 'filter--large-mb' : ''}`}>
      <p htmlFor='' className='filter__title'>
        {title}
      </p>
      {filterInputs[type]()}
    </div>
  );
};

export default Filter;
