import { useState, useRef } from 'react';

const Filter = ({ type, title, options, hasLargeMarginBottom }) => {
  const [priceTypingTimeout, setPriceTypingTimeout] = useState(0);
  const lowestPriceInputValue = useRef(null);
  const highestPriceInputValue = useRef(null);

  const handlePriceInputChange = (value, type, filterCallback) => {
    const enteredPriceValue = Number(value);

    if (priceTypingTimeout) clearTimeout(priceTypingTimeout);
    setPriceTypingTimeout(
      setTimeout(() => {
        const oldPrice =
          type === 'lowest'
            ? lowestPriceInputValue.current.value
            : highestPriceInputValue.current.value;

        if (oldPrice === enteredPriceValue) filterCallback(enteredPriceValue);
      }, 1500)
    );

    // setTimeout(() => {
    //   console.log('timeout');
    //   const oldPrice =
    //     type === 'lowest'
    //       ? lowestPriceInputValue.current.value
    //       : highestPriceInputValue.current.value;

    //   if (oldPrice === enteredPriceValue) filterCallback(enteredPriceValue);
    // }, 1500);
  };

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
              checked={option.checked}
              onChange={option.filter}
            />
            <label htmlFor={`${type}-${index}`}> - {option.title}</label>
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
              onChange={option.filter}
            />
            <label htmlFor={`${type}-${index}`}> - {option.title}</label>
          </div>
        );
      });
    },
    price: () => {
      return options.map((option, index) => {
        return (
          <div key={`${option}-${index}`} className='filter__option--large-mb'>
            <label htmlFor={`${type}-${index}`} className='filter__label--mr'>
              {option.title}
            </label>
            <input
              type='text'
              placeholder={index === 0 ? '0' : '10000'}
              ref={index === 0 ? lowestPriceInputValue : highestPriceInputValue}
              className='filter__input'
              value={option.value}
              onChange={e =>
                handlePriceInputChange(
                  e.target.value,
                  index === 0 ? 'lowest' : 'highest',
                  option.filter(e.target.value)
                )
              }
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
              checked={option.isChecked}
              onChange={() => option.filter(option.airline)}
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
