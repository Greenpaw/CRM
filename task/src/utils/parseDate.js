const addLeadingZeroes = (number) => {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
}

export const parseDate = (date) => {
  let dateObj = new Date(date);
  return `${addLeadingZeroes(dateObj.getDate())}.${addLeadingZeroes(dateObj.getMonth() + 1)}.${dateObj.getFullYear()}`
}