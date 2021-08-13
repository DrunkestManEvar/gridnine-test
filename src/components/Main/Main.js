import { useState, useEffect, useCallback } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Filters from '../Filters/Filters';
import Flights from '../Flights/Flights';
import { extractFlightsInfo } from '../../utility';

const Main = () => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const checkIfDuplicatedPriceShouldChange = (
    duplicatedPrice,
    currFlightPrice
  ) => {
    return duplicatedPrice > currFlightPrice
      ? currFlightPrice
      : duplicatedPrice;
  };

  const saveUniqueAirlines = useCallback((arrayOfFlights, currentFlight) => {
    const currAirlineName = currentFlight.flight.carrier.caption;
    const currFlightPrice = currentFlight.flight.price.total.amount;

    if (!arrayOfFlights.some(obj => obj.airline === currAirlineName)) {
      arrayOfFlights.push({ airline: currAirlineName, price: currFlightPrice });
    } else {
      const duplicatedAirline = arrayOfFlights.find(
        flight => flight.airline === currAirlineName
      );
      const duplicatedPrice = duplicatedAirline.price;

      duplicatedAirline.price = checkIfDuplicatedPriceShouldChange(
        duplicatedPrice,
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
        const flights = extractFlightsInfo(fetchedFlights);
        console.log(flights[0]);
        const airlines = fetchedFlights.reduce(saveUniqueAirlines, []);

        setAirlines(airlines);
        setFlights(flights);
      });
  }, [saveUniqueAirlines]);

  useEffect(() => {
    getFlightsData();
  }, [getFlightsData]);

  return (
    <Wrapper>
      <main className='main'>
        <Filters airlines={airlines} />
        <Flights flights={flights} />
      </main>
    </Wrapper>
  );
};

export default Main;
