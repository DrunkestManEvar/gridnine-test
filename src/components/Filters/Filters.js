import { useState, useCallback } from 'react';
import Filter from '../Filter/Filter';

const Filters = ({ flights, shownFlights, airlines, handleFilterFlights }) => {
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

  const ascendingFilter = () => {
    setSortByFilter('ascending');
    const ascendingFlights = flights.slice().sort((a, b) => a.price - b.price);
    handleFilterFlights(ascendingFlights);
  };

  const descendingFilter = () => {
    setSortByFilter('descending');
    const descendingFlights = flights.slice().sort((a, b) => b.price - a.price);
    handleFilterFlights(descendingFlights);
  };

  const travelTimeFilter = () => {
    setSortByFilter('travelTime');
    const shortestTravelTimeFlights = flights
      .slice()
      .sort((a, b) => a.duration - b.duration);
    handleFilterFlights(shortestTravelTimeFlights);
  };

  const setDirectOnlyFlights = () => {
    setIsDirectFlightFilter({ connecting: false, direct: true });
    const directFlights = flights.slice().filter(flight => flight.isDirect);
    handleFilterFlights(directFlights);
  };

  const setConnectingOnlyFlights = () => {
    setIsDirectFlightFilter({ direct: false, connecting: true });
    const connectingFlights = flights
      .slice()
      .filter(flight => !flight.isDirect);
    handleFilterFlights(connectingFlights);
  };

  const setAllFlights = () => {
    setIsDirectFlightFilter({ direct: true, connecting: true });
    handleFilterFlights(flights);
  };

  const resetAllFlights = () => {
    setIsDirectFlightFilter({ direct: false, connecting: false });
    handleFilterFlights(flights);
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

    let filteredFlights = flights.slice();

    if (filtersList.length) {
      filteredFlights = filteredFlights.filter(flight =>
        filtersList.includes(flight.airlineName)
      );
    }

    handleFilterFlights(filteredFlights);
  };

  const filterLowestPrice = useCallback(
    enteredValue => {
      const newLowestPrice = Number(enteredValue);
      setPriceFilter(prevState => ({ ...prevState, lowest: newLowestPrice }));
      const filteredFlights = flights.slice().filter(flight => {
        let shouldFlightBeIncluded = false;

        if (!priceFilter.highest) {
          shouldFlightBeIncluded = flight.price > newLowestPrice;
        }

        if (priceFilter.highest) {
          shouldFlightBeIncluded =
            flight.price > newLowestPrice && flight.price < priceFilter.highest;
        }

        return shouldFlightBeIncluded;
      });

      handleFilterFlights(filteredFlights);
    },
    [flights, handleFilterFlights, priceFilter.highest]
  );

  const filterHighestPrice = useCallback(
    enteredValue => {
      const newHighestPrice = Number(enteredValue);
      setPriceFilter(prevState => ({ ...prevState, highest: newHighestPrice }));
      const filteredFlights = flights.slice().filter(flight => {
        let shouldFlightBeIncluded = false;

        if (!priceFilter.lowest) {
          shouldFlightBeIncluded = flight.price < newHighestPrice;
        }

        if (priceFilter.lowest) {
          shouldFlightBeIncluded =
            flight.price < newHighestPrice && flight.price > priceFilter.lowest;
        }

        return shouldFlightBeIncluded;
      });

      handleFilterFlights(filteredFlights);
    },
    [flights, handleFilterFlights, priceFilter.lowest]
  );

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
          value: priceFilter.lowest,
          filter: filterLowestPrice
        },
        {
          title: 'До',
          type: 'highest',
          value: priceFilter.highest,
          filter: filterHighestPrice
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

  return (
    <form className='filters'>
      {filters.map((filter, index) => (
        <Filter
          key={`${filter.type}${index}`}
          type={filter.type}
          title={filter.title}
          options={filter.options}
          hasLargeMarginBottom={index === 0}
          filterHighestPrice={filterHighestPrice}
          filterLowestPrice={filterLowestPrice}
        />
      ))}
    </form>
  );
};

export default Filters;
