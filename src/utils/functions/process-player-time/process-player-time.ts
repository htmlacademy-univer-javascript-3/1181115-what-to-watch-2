import moment from 'moment';

export const processPlayerTime = (time: number) => {
  const hours = moment.duration(time, 'seconds').asHours();

  return (hours < 1) ?
    ({
      time: moment.utc(time * 1000).format('-mm:ss'),
      timeFormated: '00:00',
    })
    :
    ({
      time: moment.utc(time * 1000).format('-HH:mm:ss'),
      timeFormated: '00:00:00',
    });
};
