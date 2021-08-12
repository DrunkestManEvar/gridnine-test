import Filter from '../Filter/Filter';

const Filters = ({ airlines }) => {
  const filters = [
    {
      type: 'sortBy',
      title: 'Сортировать',
      options: ['по возрастанию цены', 'по убыванию цены', 'по времени в пути']
    },
    {
      type: 'isDirectFlight',
      title: 'Фильтровать',
      options: ['1 пересадка', 'без пересадок']
    },
    {
      type: 'price',
      title: 'Цена',
      options: ['От', 'До']
    },
    {
      type: 'airlineName',
      title: 'Авиакомпании',
      options: airlines
    }
  ];

  return (
    <form className='filters'>
      {filters.map((filter, index) => (
        <Filter
          key={`${filter.type}${index}`}
          type={filter.type}
          title={filter.title}
          options={filter.options}
          hasLargeMarginBottom={index === 0}
        />
      ))}
    </form>
  );
};

export default Filters;
