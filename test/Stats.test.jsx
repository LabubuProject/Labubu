import React from 'react';
import { render, screen } from '@testing-library/react';
import Stats from '../src/components/Stats';
import { AuthContext } from '../src/AuthContext/AuthContext';
import '@testing-library/jest-dom';
import 'jest';

//  Mock timer component 
    // replacing real timer component with a fake one for the test
    jest.mock('../src/components/Timer', () => () => <div data-testid="timer">Timer</div>);

// grouping all the Stats components
describe('Stats Component', () => {
    // making a fake user to for AuthContext testing
  const mockUser = { username: 'laura' };
// helper function to prevent DRY
  const renderStatswithContext = (props) => {
    return render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Stats {...props} />
      </AuthContext.Provider>
    );
  };

  test('renders Timer and flip count', () => {
    renderStatswithContext({ flips: 3, gameWon: false, paused: false });

    expect(screen.getByTestId('timer')).toBeInTheDocument();
    expect(screen.getByText('Number of Flips: 3')).toBeInTheDocument();
  });

  test('shows win message when game is won', () => {
    renderStatswithContext({ flips: 5, gameWon: true, paused: false });

    expect(screen.getByText('You Win laura!')).toBeInTheDocument();
  });

  test('does NOT show win message when game is not won', () => {
    renderStatswithContext({ flips: 2, gameWon: false, paused: false });

    expect(screen.queryByText(/You Win/)).not.toBeInTheDocument();
  });
});

// adding this comment to test pushing into github
