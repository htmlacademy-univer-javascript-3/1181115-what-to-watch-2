import { changeVideoTimeFormat } from './change-video-time-format';

describe('Function: changeVideoTimeFormat', () => {
  it('should return time from seconds to format: -mm:ss, and time format: 00:00, if time less than 1 hour', () => {
    expect(changeVideoTimeFormat(30.2302)).toEqual({time: '-00:30', timeFormated: '00:00'});
  });

  it('should return time from seconds to format: -hh:mm:ss, and time format: 00:00:00, if time more than 1 hour', () => {
    expect(changeVideoTimeFormat(5644.8)).toEqual({time: '-01:34:04', timeFormated: '00:00:00'});
  });
});
