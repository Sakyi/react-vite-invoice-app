export const DateFormatter = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "short", // 'Jan'
    day: "numeric", // '8'
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
