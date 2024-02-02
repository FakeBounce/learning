import { Route, Routes } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testProvider';

import Page404 from '@src/pages/Page404';

describe('Page404 component', () => {
  test('renders without errors', () => {
    render(
      <Routes location={'/error'}>
        <Route path="/error" element={<Page404 />} />
      </Routes>
    );

    expect(screen.getByText('Cette page est introuvable')).toBeInTheDocument();
  });

  test('calls navigate function when button is clicked', () => {
    render(
      <Routes location={'/error'}>
        <Route path="/error" element={<Page404 />} />
      </Routes>
    );

    const backButton = screen.getByText('Go to Home');
    fireEvent.click(backButton);

    // Use act to wait for state updates (e.g., navigation)
    act(() => {});

    expect(location.pathname).toBe('/');
  });
});
