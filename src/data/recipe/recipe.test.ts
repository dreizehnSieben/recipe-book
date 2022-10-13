import Recipe from 'data/recipe';

describe('Recipe', () => {
    describe('construction', () => {
        test('via constructor', () => {
            const recipe = new Recipe(
                1,
                'Rezept',
                'Zutat 1',
                'Zutat 2',
                'Zutat 3',
                'Beschreibung',
                false,
                new Date(),
            );

            expect(recipe.title).toBe('Rezept');
        });

        test('As a result from a JSON string', () => {
            const jsonString = JSON.stringify({
                id: 1,
                title: "Rezept",
                ingredient1: "Zutat 1",
                ingredient2: "Zutat 2",
                ingredient3: "Zutat 3",
                description: "Beschreibung",
                favorite: false,
                createAt: new Date(Date.now())
            });

            const result = Recipe.from(jsonString);

            expect(result.isSuccess);

            // test for prop
            const recipe = result.match({
                failure: (error) => error,
                success: (value) => value,
            }) as Recipe;

            expect(recipe.title).toBe('Rezept');
        });
    });
});