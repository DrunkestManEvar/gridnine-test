import { useState } from 'react';
import Flight from '../Flight/Flight';
import ShowMoreButton from '../general/buttons/ShowMoreButton/ShowMoreButton';

const Flights = ({ flights }) => {
  const [shownFlightsNum, setShownFlightsNum] = useState(5);
  if (!flights) return null;
  const shownFlights = flights.slice(0, shownFlightsNum);

  const handleShowMoreFlights = () => {
    setShownFlightsNum(prevState => prevState + 5);
  };

  return (
    <section className='flights'>
      {shownFlights.map((flight, index) => (
        <Flight key={`flight-${index}`} flight={flight} />
      ))}
      <div className='flights__show-more'>
        <ShowMoreButton
          handleClick={handleShowMoreFlights}
          isDisabled={shownFlights.length === flights.length}
        />
      </div>
    </section>
  );
};

export default Flights;
