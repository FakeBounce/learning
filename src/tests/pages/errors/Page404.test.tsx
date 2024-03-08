import { render, screen } from '@testProvider';
import { Route, Routes } from 'react-router-dom';

import Page404 from '@src/pages/errors/Page404';

describe('Page404 component', () => {
  test('renders without errors', () => {
    render(
      <Routes location={'/error'}>
        <Route path="/error" element={<Page404 />} />
      </Routes>
    );

    expect(screen.getByText('404 Title')).toBeInTheDocument();
  });
});
