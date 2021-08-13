import SelectButton from '../general/buttons/SelectButton/SelectButton';

const Flight = ({ flight }) => {
  const { price, firstSegment, secondSegment, airlineCode } = flight;
  const segments = [firstSegment, secondSegment];
  const options = { day: 'numeric', month: 'short', weekday: 'short' };
  console.log(flight);

  return (
    <article className='flight'>
      <div className='flight__top-bar'>
        <div className='flight__logo'>
          <img
            src={`https://content.airhex.com/content/logos/airlines_${airlineCode}_85_25_r.png?background=0087c9`}
            alt='Логотип авиакомпании'
          />
        </div>
        <div className='flight__price-container'>
          <p className='flight__price'>{price} &#8381;</p>
          <p>Стоимость для одного взрослого пассажира</p>
        </div>
      </div>
      {segments.map((segmentsArray, index) => {
        const startingSegment = segmentsArray.find(segment => segment.starting);

        const {
          departureCity: { caption: departureCity },
          departureAirport,
          departureDate: departureISO,
          airline: { caption: departureCarrier }
        } = startingSegment;

        const departureDate = new Date(departureISO);
        const departureDateParsed = new Intl.DateTimeFormat(
          'ru-RU',
          options
        ).format(departureDate);
        const departureTimeToDisplay = departureISO.slice(11, 16);
        const departureDateToDisplay = `${departureDateParsed.slice(
          4
        )} ${departureDateParsed.slice(0, 2)}`;

        const endingSegment = segmentsArray.find(segment => !segment.starting);
        const {
          arrivalCity: { caption: arrivalCity },
          arrivalAirport,
          arrivalDate: arrivalISO,
          airline: { caption: arrivalCarrier }
        } = endingSegment;

        const arrivalDate = new Date(arrivalISO);
        const arrivalDateParsed = new Intl.DateTimeFormat(
          'ru-RU',
          options
        ).format(arrivalDate);
        const arrivalTimeToDisplay = arrivalISO.slice(11, 16);
        const arrivalDateToDisplay = `${arrivalDateParsed.slice(
          4
        )} ${arrivalDateParsed.slice(0, 2)}`;

        return (
          <div key={`${price}${index}`} className='flight__segment'>
            <div className='flight__locations'>
              <p>
                <span className='flight__airport'>
                  {departureCity}, {departureAirport.caption}
                </span>
                <span className='flight__airport-code'>
                  ({departureAirport.uid})
                </span>
                <span className='flight__arrow'>&nbsp;</span>
                <span className='flight__airport'>
                  {arrivalCity}, {arrivalAirport.caption}
                </span>
                <span className='flight__airport-code'>
                  ({arrivalAirport.uid})
                </span>
              </p>
            </div>
            <div className='flight__time-info'>
              <div className='flight__time-container'>
                <span className='flight__time'>{departureTimeToDisplay}</span>
                <span className='flight__date'>{departureDateToDisplay}</span>
              </div>
              <div className='flight__time-container'>
                <div className='flight__clock'></div>
                <span className='flight__duration'>4 ч 25 мин</span>
              </div>
              <div className='flight__time-container'>
                <span className='flight__date'>{arrivalDateToDisplay}</span>
                <span className='flight__time'>{arrivalTimeToDisplay}</span>
              </div>
              <div className='flight__line'>
                <p className='flight__connections-number'>1 пересадка</p>
              </div>
            </div>
            <p className='flight__carrier'>
              Рейс выполняет: {index === 0 ? departureCarrier : arrivalCarrier}
            </p>
          </div>
        );
      })}
      {/* <div className='flight__segment'>
        <div className='flight__locations'>
          <p>
            <span className='flight__airport'>Москва, ШЕРЕМЕТЬЕВО</span>
            <span className='flight__airport-code'>(SVO)</span>
            <span className='flight__arrow'>&nbsp;</span>
            <span className='flight__airport'>ЛОНДОН, Лондон, Хитроу</span>
            <span className='flight__airport-code'>(LHR)</span>
          </p>
        </div>
        <div className='flight__time-info'>
          <div className='flight__time-container'>
            <span className='flight__time'>07:05</span>
            <span className='flight__date'>18 авг. вт</span>
          </div>
          <div className='flight__time-container'>
            <div className='flight__clock'></div>
            <span className='flight__duration'>4 ч 25 мин</span>
          </div>
          <div className='flight__time-container'>
            <span className='flight__date'>18 авг. вт</span>
            <span className='flight__time'>07:05</span>
          </div>
          <div className='flight__line'>
            <p className='flight__connections-number'>1 пересадка</p>
          </div>
        </div>
        <p className='flight__carrier'>Рейс выполняет: ГТК Россия</p>
      </div>
      <div className='flight__segment'>
        <div className='flight__locations'>
          <p>
            <span className='flight__airport'>Москва, ШЕРЕМЕТЬЕВО</span>
            <span className='flight__airport-code'>(SVO)</span>
            <span className='flight__arrow'>&nbsp;</span>
            <span className='flight__airport'>ЛОНДОН, Лондон, Хитроу</span>
            <span className='flight__airport-code'>(LHR)</span>
          </p>
        </div>
        <div className='flight__time-info'>
          <div className='flight__time-container'>
            <span className='flight__time'>07:05</span>
            <span className='flight__date'>18 авг. вт</span>
          </div>
          <div className='flight__time-container'>
            <div className='flight__clock'></div>
            <span className='flight__duration'>4 ч 25 мин</span>
          </div>
          <div className='flight__time-container'>
            <span className='flight__date'>18 авг. вт</span>
            <span className='flight__time'>07:05</span>
          </div>
          <div className='flight__line'>
            <p className='flight__connections-number'>1 пересадка</p>
          </div>
        </div>
        <p className='flight__carrier'>Рейс выполняет: ГТК Россия</p>
      </div> */}
      <SelectButton />
    </article>
  );
};

export default Flight;
