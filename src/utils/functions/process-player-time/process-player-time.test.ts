import { processPlayerTime } from './process-player-time';

describe('Function: processPlayerTime', () => {
  it('should return time from seconds to format: -mm:ss, and time format: 00:00, if time less than 1 hour', () => {
    expect(processPlayerTime(30.2302)).toEqual({time: '-00:30', timeFormated: '00:00'});
  });

  it('should return time from seconds to format: -hh:mm:ss, and time format: 00:00:00, if time more than 1 hour', () => {
    expect(processPlayerTime(5644.8)).toEqual({time: '-01:34:04', timeFormated: '00:00:00'});
  });
});
