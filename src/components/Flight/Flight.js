import FlightSegment from '../FlightSegment/FlightSegment';
import SelectButton from '../general/buttons/SelectButton/SelectButton';
import {
  formatDateAndTime,
  calcTimeDifference,
  getCityName
} from '../../utility';

const Flight = ({ flight }) => {
  const { price, segments, airlineCode } = flight;

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
        const isIndirectFlight = segmentsArray.length > 1;

        const startingSegment = segmentsArray.find(segment => segment.starting);
        const endingSegment = isIndirectFlight
          ? segmentsArray.find(segment => !segment.starting)
          : segmentsArray[0];

        const {
          departureAirport,
          departureDate: departureISO,
          airline: { caption: departureCarrier }
        } = startingSegment;
        const {
          arrivalAirport,
          arrivalDate: arrivalISO,
          airline: { caption: arrivalCarrier }
        } = endingSegment;

        const departureCityToDisplay = getCityName(
          startingSegment,
          'departureCity'
        );
        const arrivalCityToDisplay = getCityName(endingSegment, 'arrivalCity');

        const {
          formattedDate: departureDate,
          timeToDisplay: departureTimeToDisplay,
          dateToDisplay: departureDateToDisplay
        } = formatDateAndTime(departureISO);
        const {
          formattedDate: arrivalDate,
          timeToDisplay: arrivalTimeToDisplay,
          dateToDisplay: arrivalDateToDisplay
        } = formatDateAndTime(arrivalISO);

        const { hours, minutes } = calcTimeDifference(
          departureDate,
          arrivalDate
        );

        const segmentInfo = {
          departureInfo: {
            city: departureCityToDisplay,
            airportName: departureAirport.caption,
            airportUid: departureAirport.uid,
            carrier: departureCarrier,
            date: departureDateToDisplay,
            time: departureTimeToDisplay
          },
          arrivalInfo: {
            city: arrivalCityToDisplay,
            airportName: arrivalAirport.caption,
            airportUid: arrivalAirport.uid,
            carrier: arrivalCarrier,
            date: arrivalDateToDisplay,
            time: arrivalTimeToDisplay
          },
          duration: { hours, minutes },
          isIndirectFlight,
          index
        };

        return <FlightSegment key={`${price}${index}`} info={segmentInfo} />;
      })}
      <SelectButton />
    </article>
  );
};

export default Flight;
