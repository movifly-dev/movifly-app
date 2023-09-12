const formatStringToDate = (dateString) => {
  // Split the input string into day, month, and year components
  const [day, month, year] = dateString.split('/').map(Number);

  // Create a new Date object (note that months are 0-based, so we subtract 1 from the month)
  const dateObject = new Date(year, month - 1, day);

  return dateObject;
};

export default formatStringToDate;
