import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChordListing from './ChordListing';

describe('ChordListing', () => {
  it('should render base chords list and actions', () => {
    render(<ChordListing />);

    screen.getByRole('button', { name: 'Hide chords list' });
    expect(
      screen.getByRole('link', { name: 'See all chords' })
    ).toHaveAttribute('href', '/chords');
    const chordSVGs = screen.getAllByTestId(/chord-/);
    expect(chordSVGs).toHaveLength(7);
  });

  it('should hide chords list when clicking on the eye icon', async () => {
    render(<ChordListing />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Hide chords list' })
    );

    expect(screen.queryAllByTestId(/chord-/)).toHaveLength(0);

    await userEvent.click(
      screen.getByRole('button', { name: 'Show chords list' })
    );

    expect(screen.queryAllByTestId(/chord-/)).toHaveLength(7);
  });
});
