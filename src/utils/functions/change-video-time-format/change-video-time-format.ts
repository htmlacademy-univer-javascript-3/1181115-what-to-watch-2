import moment from 'moment';

export const changeVideoTimeFormat = (time: number) => {
  const hours = moment.duration(time, 'seconds').asHours();

  if (hours < 1) {
    return ({
      time: moment.utc(time * 1000).format('-mm:ss'),
      timeFormated: '00:00',
    });
  } else {
    return ({
      time: moment.utc(time * 1000).format('-HH:mm:ss'),
      timeFormated: '00:00:00',
    });
  }
};
