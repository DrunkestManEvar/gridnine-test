const timeFormatOptions = {
  day: 'numeric',
  month: 'short',
  weekday: 'short'
};

const formatDateAndTime = isoString => {
  const formattedDate = new Date(isoString);
  const dateParsed = new Intl.DateTimeFormat('ru-RU', timeFormatOptions).format(
    formattedDate
  );

  const timeToDisplay = isoString.slice(11, 16);
  const dateToDisplay = `${dateParsed.slice(4)} ${dateParsed.slice(0, 2)}`;

  return { formattedDate, timeToDisplay, dateToDisplay };
};

export default formatDateAndTime;
