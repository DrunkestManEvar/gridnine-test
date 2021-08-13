import Flight from '../Flight/Flight';
import ShowMoreButton from '../general/buttons/ShowMoreButton/ShowMoreButton';

const Flights = ({ flights }) => {
  if (!flights) return null;

  return (
    <section className='flights'>
      {flights.map((flight, index) => (
        <Flight key={`flight-${index}`} flight={flight} />
      ))}
      <div className='flights__show-more'>
        <ShowMoreButton />
      </div>
    </section>
  );
};

export default Flights;
