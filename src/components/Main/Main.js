import { useState, useEffect, useCallback } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Filters from '../Filters/Filters';
import Flights from '../Flights/Flights';
import { extractFlightsInfo } from '../../utility';

const Main = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const checkIfDuplicatePriceShouldChange = (
    duplicatedPrice,
    currFlightPrice
  ) => {
    return duplicatedPrice > currFlightPrice
      ? currFlightPrice
      : duplicatedPrice;
  };

  const saveUniqueAirlines = useCallback((arrayOfFlights, currentFlight) => {
    const currAirlineName = currentFlight.airlineName;
    const currFlightPrice = currentFlight.price;

    if (!arrayOfFlights.some(obj => obj.airline === currAirlineName)) {
      arrayOfFlights.push({ airline: currAirlineName, price: currFlightPrice });
    } else {
      const duplicatedAirline = arrayOfFlights.find(
        flight => flight.airline === currAirlineName
      );
      const duplicatePrice = duplicatedAirline.price;

      duplicatedAirline.price = checkIfDuplicatePriceShouldChange(
        duplicatePrice,
        currFlightPrice
      );
    }

    return arrayOfFlights;
  }, []);

  const getFlightsData = useCallback(() => {
    fetch('./flights.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        const fetchedFlights = res.result.flights;
        const flights = extractFlightsInfo(fetchedFlights).sort(
          (a, b) => a.price - b.price
        );
        const airlines = flights.reduce(saveUniqueAirlines, []);

        setAirlines(airlines);
        setFlights(flights);
        setFilteredFlights(flights);
      });
  }, [saveUniqueAirlines]);

  useEffect(() => {
    getFlightsData();
  }, [getFlightsData]);

  return (
    <Wrapper>
      <main className='main'>
        <Filters
          flights={flights}
          filteredFlights={filteredFlights}
          airlines={airlines}
          handleFilterFlights={setFilteredFlights}
        />
        <Flights flights={filteredFlights} />
      </main>
    </Wrapper>
  );
};

export default Main;
