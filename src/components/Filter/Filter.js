import { useState, useEffect, useRef } from 'react';

const Filter = ({
  type,
  title,
  options,
  hasLargeMarginBottom,
  filterHighestPrice,
  filterLowestPrice
}) => {
  const [lowestPrice, setLowestPrice] = useState('');
  const [highestPrice, setHighestPrice] = useState('');
  const lowestPriceInputValue = useRef(null);
  const highestPriceInputValue = useRef(null);

  const handlePriceInputChange = (value, typeOfPrice) => {
    if (typeOfPrice === 'lowest') setLowestPrice(value);
    else setHighestPrice(value);
  };

  useEffect(() => {
    const filterByPriceTimeout = setTimeout(() => {
      if (lowestPrice && lowestPrice === lowestPriceInputValue.current.value)
        filterLowestPrice(lowestPrice);
    }, 1500);

    return () => clearTimeout(filterByPriceTimeout);
  }, [lowestPrice, filterLowestPrice]);

  useEffect(() => {
    const filterByPriceTimeout = setTimeout(() => {
      if (highestPrice && highestPrice === highestPriceInputValue.current.value)
        filterHighestPrice(highestPrice);
    }, 1500);

    return () => clearTimeout(filterByPriceTimeout);
  }, [highestPrice, filterHighestPrice]);

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
              ref={
                option.type === 'lowest'
                  ? lowestPriceInputValue
                  : highestPriceInputValue
              }
              className='filter__input'
              value={option.type === 'lowest' ? lowestPrice : highestPrice}
              onChange={e =>
                handlePriceInputChange(e.target.value, option.type)
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
