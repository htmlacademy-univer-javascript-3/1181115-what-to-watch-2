export const changeDateFormat = (date: string) => {
  const newDate = new Date(date);

  const mounth = newDate.toLocaleString('en-US', { month: 'long' });
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${mounth} ${day}, ${year}`;
};
