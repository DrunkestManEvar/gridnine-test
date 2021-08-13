const extractFlightsInfo = flightsArray => {
  return flightsArray.map(flight => {
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
};

export default extractFlightsInfo;
