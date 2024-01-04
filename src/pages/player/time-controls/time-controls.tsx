import { processPlayerTime } from '../../../functions/processPlayerTime';

export interface TimeControlsProps {
  time: number;
  duration: number;
}

export default function TimeControls({ time, duration }: TimeControlsProps) {
  return (
    <div className='player__controls-row'>
      <div className='player__time'>
        <progress className='player__progress' value={time} max={duration?.toString()}></progress>
        <div className='player__toggler' style={{ left: `${time / duration * 100}%` }}>Toggler</div>
      </div>
      <div className='player__time-value'>{processPlayerTime(time, duration)}</div>
    </div>
  );
}
