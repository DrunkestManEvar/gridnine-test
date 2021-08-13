import Flight from '../Flight/Flight';
import ShowMoreButton from '../general/buttons/ShowMoreButton/ShowMoreButton';

const Flights = ({ flights }) => {
  console.log(flights[0]);
  // console.log(
  //   flights.filter(flight => {
  //     let segmentsNum = 0;

  //     const { legs } = flight.flight;

  //     for (const leg of legs) {
  //       segmentsNum += leg.segments.length;
  //     }

  //     if (segmentsNum <= 2) return flight;
  //   })
  // );

  const flightsToDisplay = flights.map((flight, index) => {
    const { airlineCode, caption } = flight.flight.carrier;
    const { amount: price } = flight.flight.price.total;
    const { legs } = flight.flight;
    let flightSegments = [];

    for (const leg of legs) {
      const { segments } = leg;
      flightSegments.push(segments);
    }

    const [firstSegment, secondSegment] = flightSegments;
    return { airlineCode, caption, price, firstSegment, secondSegment };
  });

  if (!flights) return null;

  return (
    <section className='flights'>
      {flightsToDisplay.slice(0, 3).map((flight, index) => (
        <Flight key={`flight-${index}`} flight={flight} />
      ))}
      <div className='flights__show-more'>
        <ShowMoreButton />
      </div>
    </section>
  );
};

export default Flights;
