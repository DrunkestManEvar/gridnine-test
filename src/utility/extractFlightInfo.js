const extractFlightsInfo = flightsArray => {
  return flightsArray.map((flight, i) => {
    const { airlineCode, caption: airlineName } = flight.flight.carrier;
    let { amount: price } = flight.flight.price.total;
    price = Number(price);
    const { legs } = flight.flight;
    let flightSegments = [];
    let duration = 0;

    for (const leg of legs) {
      const { segments, duration: segmentDuration } = leg;
      flightSegments.push(segments);
      duration += segmentDuration;
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
      duration,
      segments: flightSegments,
      isDirect
    };
  });
};

export default extractFlightsInfo;
