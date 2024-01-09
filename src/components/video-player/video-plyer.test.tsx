import { render, screen } from '@testing-library/react';
import VideoPlayer from './video-player.tsx';
import { filmInfo } from '../../utils/mock-data.ts';
import { FilmCardSize, VIDEO_TIMEOUT } from '../../consts.ts';

describe('Component: VideoPlayer', () => {
  const film = filmInfo();

  it('should display image if active === false', () => {
    render(
      <VideoPlayer
        active={false}
        img={film.backgroundImage}
        src={film.videoLink}
        filmTitle={film.name}
        videoTimeout={VIDEO_TIMEOUT}
        width={FilmCardSize.Width}
        height={FilmCardSize.Height}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should display video on hover if active === true', () => {
    render(
      <VideoPlayer
        active
        img={film.backgroundImage}
        src={film.videoLink}
        filmTitle={film.name}
        videoTimeout={VIDEO_TIMEOUT}
        width={FilmCardSize.Width}
        height={FilmCardSize.Height}
      />
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
