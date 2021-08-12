import { useState, useEffect } from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Filters from '../Filters/Filters';
import Flights from '../Flights/Flights';

const Main = () => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const getFlightsData = () => {
    fetch('./flights.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        const fetchedFlights = res.result.flights;

        const fetchedAirlines = fetchedFlights.reduce((acc, curr) => {
          const currAirlineName = curr.flight.carrier.caption;
          const currFlightPrice = curr.flight.price.total.amount;

          if (!acc.some(obj => obj.airline === currAirlineName)) {
            acc.push({ airline: currAirlineName, price: currFlightPrice });
          } else {
            const duplicatedAirline = acc.find(
              flight => flight.airline === currAirlineName
            );
            const duplicatedPrice = duplicatedAirline.price;

            duplicatedAirline.price =
              duplicatedPrice > currFlightPrice
                ? currFlightPrice
                : duplicatedPrice;
          }

          return acc;
        }, []);

        setAirlines(fetchedAirlines);
        setFlights(fetchedFlights);
      });
  };

  useEffect(() => {
    getFlightsData();
  }, []);

  return (
    <Wrapper>
      <main className='main'>
        <Filters airlines={airlines} />
        <Flights />
      </main>
    </Wrapper>
  );
};

export default Main;
