const extractFlightsInfo = flightsArray => {
  return flightsArray.map((flight, i) => {
    const { airlineCode, caption: airlineName } = flight.flight.carrier;
    const { amount: price } = flight.flight.price.total;
    const { legs } = flight.flight;
    let flightSegments = [];

    for (const leg of legs) {
      const { segments } = leg;
      flightSegments.push(segments);
    }

    let numOfSegments = 0;
    let isDirect = true;

    for (const flightSegment of flightSegments) {
      numOfSegments += flightSegment.length;
    }

    if (numOfSegments > 2) isDirect = false;

    return {
      airlineCode,
      airlineName,
      price,
      segments: flightSegments,
      isDirect
    };
  });
};

export default extractFlightsInfo;
