const formatUnitOfTime = unitOfTime =>
  unitOfTime <= 9 ? `0${unitOfTime}` : unitOfTime;

const calcTimeDifference = (olderDate, newerDate) => {
  let timeDiffInMs = (newerDate - olderDate) / 1000;

  const days = Math.floor(timeDiffInMs / 86400);
  timeDiffInMs -= days * 86400;

  let hours = Math.floor(timeDiffInMs / 3600) % 24;
  timeDiffInMs -= hours * 3600;
  if (days > 0) hours += days * 24;
  hours = formatUnitOfTime(hours);

  let minutes = Math.floor(timeDiffInMs / 60) % 60;
  timeDiffInMs -= minutes * 60;
  minutes = formatUnitOfTime(minutes);

  return { hours, minutes };
};

export default calcTimeDifference;
