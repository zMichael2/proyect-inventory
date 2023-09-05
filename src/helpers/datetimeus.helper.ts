const getDateInUSTimezone = () => {
  const currentTime = new Date();
  const options = {
    timeZone: "America/New_York",
  };

  const year = currentTime.toLocaleString("en-US", {
    ...options,
    year: "numeric",
  });
  const month = currentTime.toLocaleString("en-US", {
    ...options,
    month: "2-digit",
  });
  const day = currentTime.toLocaleString("en-US", {
    ...options,
    day: "2-digit",
  });

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};

export { getDateInUSTimezone };
