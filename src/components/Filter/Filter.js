import { useState, useEffect, useRef } from 'react';

const Filter = ({
  type,
  title,
  options,
  filteredFlights,
  isDirectFilterApplied,
  hasLargeMarginBottom,
  filterHighestPrice,
  filterLowestPrice
}) => {
  const [lowestPrice, setLowestPrice] = useState('');
  const [lowestPriceInputHasBeenTouched, setLowestPriceInputHasBeenTouched] =
    useState(false);
  const [highestPriceInputHasBeenTouched, setHighestPriceInputHasBeenTouched] =
    useState(false);
  const [highestPrice, setHighestPrice] = useState('');
  const lowestPriceInputValue = useRef(null);
  const highestPriceInputValue = useRef(null);

  const handlePriceInputChange = (value, typeOfPrice) => {
    if (typeOfPrice === 'lowest') {
      setLowestPrice(value);
      setLowestPriceInputHasBeenTouched(true);
    } else {
      setHighestPrice(value);
      setHighestPriceInputHasBeenTouched(true);
    }
  };

  useEffect(() => {
    const filterByPriceTimeout = setTimeout(() => {
      if (
        (lowestPrice !== '' || lowestPriceInputHasBeenTouched) &&
        lowestPrice === lowestPriceInputValue.current.value
      )
        filterLowestPrice(lowestPrice);
    }, 1500);

    return () => clearTimeout(filterByPriceTimeout);
  }, [lowestPrice, filterLowestPrice, lowestPriceInputHasBeenTouched]);

  useEffect(() => {
    const filterByPriceTimeout = setTimeout(() => {
      if (
        (highestPrice !== '' || highestPriceInputHasBeenTouched) &&
        highestPrice === highestPriceInputValue.current.value
      )
        filterHighestPrice(highestPrice);
    }, 1500);

    return () => clearTimeout(filterByPriceTimeout);
  }, [highestPrice, filterHighestPrice, highestPriceInputHasBeenTouched]);

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
              type='number'
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

        const canApplyFilter = filteredFlights.filter(flight => {
          if (!isDirectFilterApplied) return true;

          if (isDirectFilterApplied && flight.airlineName === option.airline)
            return true;
          else return false;
        }).length;

        return (
          <div
            key={`${option}-${index}`}
            className={`filter__option ${
              canApplyFilter ? '' : 'filter__option--disabled'
            }`}>
            <input
              type='checkbox'
              name={type}
              id={`${type}-${index}`}
              className='filter__input'
              checked={option.isChecked}
              onChange={() => option.filter(option.airline)}
              disabled={!canApplyFilter}
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
