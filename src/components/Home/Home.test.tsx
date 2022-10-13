import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from 'components/Home';

describe('Home', () => {
    it('renders w/o crashing', () => {
        render(<Home />);
        expect(screen.queryByText(/Home/)).not.toBeNull();
    });
});