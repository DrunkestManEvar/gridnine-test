import SelectButton from '../general/buttons/SelectButton/SelectButton';

const Flight = ({ flight }) => {
  // const { airline, logo, flightParts } = flight;

  return (
    <article className='flight'>
      <div className='flight__top-bar'>
        <div className='flight__logo'>
          <img
            src='https://content.airhex.com/content/logos/airlines_SU_85_25_r.png?background=0087c9'
            alt='Логотип авиакомпании'
          />
        </div>
        <div className='flight__price-container'>
          <p className='flight__price'>21049 P</p>
          <p>Стоимость для одного взрослого пассажира</p>
        </div>
      </div>
      <div className='flight__locations'>
        <p>
          <span className='flight__airport'>Москва, ШЕРЕМЕТЬЕВО</span>
          <span className='flight__airport-code'>(SVO)</span>
          <div className='flight__arrow'>&nbsp;</div>
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
      <SelectButton />
    </article>
  );
};

export default Flight;
