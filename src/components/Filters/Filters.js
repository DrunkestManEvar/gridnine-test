import { useState, useCallback, useEffect } from 'react';
import Filter from '../Filter/Filter';

const Filters = ({
  flights,
  filteredFlights,
  airlines,
  handleFilterFlights
}) => {
  const [sortByFilter, setSortByFilter] = useState('ascending');
  const [isDirectFlightFilter, setIsDirectFlightFilter] = useState({
    direct: false,
    connecting: false
  });
  const [priceFilter, setPriceFilter] = useState({
    lowest: '',
    highest: ''
  });
  const [airlinesFilter, setAirlinesFilter] = useState([]);
  const [filterCallbacks, setFilterCallbacks] = useState({
    isDirect: flight => flight,
    airlines: flight => flight,
    price: flight => flight
  });
  const [sortCallback, setSortCallback] = useState({
    ascending: (a, b) => a.price - b.price
  });

  const ascendingFilter = () => {
    setSortByFilter('ascending');
    setSortCallback({ ascending: (a, b) => a.price - b.price });
  };

  const descendingFilter = () => {
    setSortByFilter('descending');
    setSortCallback({ descending: (a, b) => b.price - a.price });
  };

  const travelTimeFilter = () => {
    setSortByFilter('travelTime');
    setSortCallback({ travelTime: (a, b) => a.duration - b.duration });
  };

  const setDirectOnlyFlights = () => {
    setIsDirectFlightFilter({ connecting: false, direct: true });
    setFilterCallbacks(prevState => ({
      ...prevState,
      isDirect: flight => flight.isDirect
    }));
  };

  const setConnectingOnlyFlights = () => {
    setIsDirectFlightFilter({ direct: false, connecting: true });
    setFilterCallbacks(prevState => ({
      ...prevState,
      isDirect: flight => !flight.isDirect
    }));
  };

  const setAllFlights = () => {
    setIsDirectFlightFilter({ direct: true, connecting: true });
    setFilterCallbacks(prevState => ({
      ...prevState,
      isDirect: flight => flight
    }));
  };

  const resetAllFlights = () => {
    setIsDirectFlightFilter({ direct: false, connecting: false });
    setFilterCallbacks(prevState => ({
      ...prevState,
      isDirect: flight => flight
    }));
  };

  const connectingFilter = () => {
    if (!isDirectFlightFilter.connecting && !isDirectFlightFilter.direct) {
      setConnectingOnlyFlights();
    }

    if (isDirectFlightFilter.connecting && isDirectFlightFilter.direct) {
      setDirectOnlyFlights();
    }

    if (!isDirectFlightFilter.connecting && isDirectFlightFilter.direct) {
      setAllFlights();
    }

    if (isDirectFlightFilter.connecting && !isDirectFlightFilter.direct) {
      resetAllFlights();
    }
  };

  const directFilter = () => {
    if (!isDirectFlightFilter.direct && !isDirectFlightFilter.connecting) {
      setDirectOnlyFlights();
    }

    if (isDirectFlightFilter.direct && isDirectFlightFilter.connecting) {
      setConnectingOnlyFlights();
    }

    if (!isDirectFlightFilter.direct && isDirectFlightFilter.connecting) {
      setAllFlights();
    }

    if (isDirectFlightFilter.direct && !isDirectFlightFilter.connecting) {
      resetAllFlights();
    }
  };

  const toggleAirlineFilter = airline => {
    const indexOfAirline = airlinesFilter.indexOf(airline);
    const filterContainsAirline = indexOfAirline !== -1;
    const filtersList = airlinesFilter.slice();

    if (filterContainsAirline) {
      filtersList.splice(indexOfAirline, 1);
      setAirlinesFilter(filtersList);
    }

    if (!filterContainsAirline) {
      setAirlinesFilter(prevState => [...prevState, airline]);
      filtersList.push(airline);
    }

    const filterByAirlineCallback = filtersList.length
      ? flight => filtersList.includes(flight.airlineName)
      : flight => flight;

    setFilterCallbacks(prevState => ({
      ...prevState,
      airlines: filterByAirlineCallback
    }));
  };

  const filterLowestPrice = useCallback(
    enteredValue => {
      let newLowestPrice = Number(enteredValue);

      if (!enteredValue || isNaN(newLowestPrice)) {
        newLowestPrice = 0;
      }

      setPriceFilter(prevState => ({ ...prevState, lowest: newLowestPrice }));

      const filterByLowestPriceCallback = flight => {
        let shouldFlightBeIncluded = false;

        if (!priceFilter.highest) {
          shouldFlightBeIncluded = flight.price > newLowestPrice;
        }

        if (priceFilter.highest) {
          shouldFlightBeIncluded =
            flight.price > newLowestPrice && flight.price < priceFilter.highest;
        }

        return shouldFlightBeIncluded;
      };

      setFilterCallbacks(prevState => ({
        ...prevState,
        price: filterByLowestPriceCallback
      }));
    },
    [priceFilter.highest]
  );

  const filterHighestPrice = useCallback(
    enteredValue => {
      let newHighestPrice = Number(enteredValue);
      if (!enteredValue || isNaN(newHighestPrice)) {
        const highestPriceOfAllFlights = Number(
          flights.sort((a, b) => b.price - a.price)[0].price
        );
        newHighestPrice = highestPriceOfAllFlights;
      }

      setPriceFilter(prevState => ({ ...prevState, highest: newHighestPrice }));

      const filterByHighestPriceCallback = flight => {
        let shouldFlightBeIncluded = false;

        if (!priceFilter.lowest) {
          shouldFlightBeIncluded = flight.price < newHighestPrice;
        }

        if (priceFilter.lowest) {
          shouldFlightBeIncluded =
            flight.price < newHighestPrice && flight.price > priceFilter.lowest;
        }

        return shouldFlightBeIncluded;
      };

      setFilterCallbacks(prevState => ({
        ...prevState,
        price: filterByHighestPriceCallback
      }));
    },
    [flights, priceFilter.lowest]
  );

  useEffect(() => {
    const filterCallbackFunctions = Object.values(filterCallbacks);

    const filteredFlights = flights.filter(flight => {
      for (let i = 0; i < filterCallbackFunctions.length; i++) {
        if (!filterCallbackFunctions[i](flight)) return false;
      }

      return true;
    });

    const sortCallbackFunction = Object.values(sortCallback)[0];

    const sortedAndFilteredFlights = filteredFlights.sort(sortCallbackFunction);

    handleFilterFlights(sortedAndFilteredFlights);
  }, [flights, filterCallbacks, sortCallback, handleFilterFlights]);

  const filters = [
    {
      type: 'sortBy',
      title: 'Сортировать',
      options: [
        {
          title: 'по возрастанию цены',
          value: 'ascending',
          checked: 'ascending' === sortByFilter,
          filter: ascendingFilter
        },
        {
          title: 'по убыванию цены',
          value: 'descending',
          checked: 'descending' === sortByFilter,
          filter: descendingFilter
        },
        {
          title: 'по времени в пути',
          value: 'travelTime',
          checked: 'travelTime' === sortByFilter,
          filter: travelTimeFilter
        }
      ]
    },
    {
      type: 'isDirectFlight',
      title: 'Фильтровать',
      options: [
        {
          title: '1 пересадка',
          value: 'connecting',
          checked: isDirectFlightFilter.connecting,
          filter: connectingFilter
        },
        {
          title: 'без пересадок',
          value: 'direct',
          checked: isDirectFlightFilter.direct,
          filter: directFilter
        }
      ]
    },
    {
      type: 'price',
      title: 'Цена',
      options: [
        {
          title: 'От',
          type: 'lowest',
          value: priceFilter.lowest
        },
        {
          title: 'До',
          type: 'highest',
          value: priceFilter.highest
        }
      ]
    },
    {
      type: 'airlineName',
      title: 'Авиакомпании',
      options: airlines.map(airline => {
        const isChecked = airlinesFilter.includes(airline.airline);

        return {
          ...airline,
          isChecked,
          filter: toggleAirlineFilter
        };
      })
    }
  ];

  if (!flights.length) return null;

  return (
    <form className='filters'>
      {filters.map((filter, index) => (
        <Filter
          key={`${filter.type}${index}`}
          type={filter.type}
          title={filter.title}
          options={filter.options}
          filteredFlights={filteredFlights}
          isDirectFilterApplied={isDirectFlightFilter.direct}
          hasLargeMarginBottom={index === 0}
          filterHighestPrice={filterHighestPrice}
          filterLowestPrice={filterLowestPrice}
        />
      ))}
    </form>
  );
};

export default Filters;
