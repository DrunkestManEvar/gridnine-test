const FlightSegment = ({ info }) => {
  const { departureInfo, arrivalInfo, duration, isIndirectFlight, index } =
    info;

  return (
    <div className='flight__segment'>
      <div className='flight__locations'>
        <p>
          <span className='flight__airport'>
            {departureInfo.city}
            {departureInfo.airportName}
          </span>
          <span className='flight__airport-code'>
            ({departureInfo.airportUid})
          </span>
          <span className='flight__arrow'>&nbsp;</span>
          <span className='flight__airport'>
            {arrivalInfo.city}
            {arrivalInfo.airportName}
          </span>
          <span className='flight__airport-code'>
            ({arrivalInfo.airportUid})
          </span>
        </p>
      </div>
      <div className='flight__time-info'>
        <div className='flight__time-container'>
          <span className='flight__time'>{departureInfo.time}</span>
          <span className='flight__date'>{departureInfo.date}</span>
        </div>
        <div className='flight__time-container'>
          <div className='flight__clock'></div>
          <span className='flight__duration'>
            {duration.hours} ч {duration.minutes} мин
          </span>
        </div>
        <div className='flight__time-container'>
          <span className='flight__date'>{arrivalInfo.date}</span>
          <span className='flight__time'>{arrivalInfo.time}</span>
        </div>
        <div className='flight__line'>
          {isIndirectFlight && (
            <p className='flight__connections-number'>1 пересадка</p>
          )}
        </div>
      </div>
      <p className='flight__carrier'>
        Рейс выполняет:{' '}
        {index === 0 ? departureInfo.carrier : arrivalInfo.carrier}
      </p>
    </div>
  );
};

export default FlightSegment;
