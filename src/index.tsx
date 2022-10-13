import React from 'react';
import ReactDOM from 'react-dom/client';

import RecipeListItem from 'components/RecipeListItem';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecipeListItem
      title="Rezept"
      description="Lorem ipsum dolor est amit bla bla blab Lorem ipsum dolor est amit bla bla blab"
      favorite
    />    
  </React.StrictMode>
);