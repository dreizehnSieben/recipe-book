import React from 'react';
import { render, screen } from '@testing-library/react';

import RecipeListItem from 'components/RecipeListItem';

describe('RecipeListItem', () => {
    it('renders w/o crashing', () => {
        render(<RecipeListItem title="Rezept" description="Beschreibung" />);

        expect(screen.queryByText(/Rezept/)).not.toBeNull();
    });
});