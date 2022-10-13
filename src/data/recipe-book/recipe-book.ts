import Recipe, { RecipeJSON } from 'data/recipe';

export default class RecipeBook {
    private bookEntries: Array<Recipe>;
    private nextId: number;

    static load() {
        const loaded = localStorage.getItem('recipes');

        return loaded
            ? RecipeBook.from(JSON.parse(loaded).map(Recipe.from))
            : RecipeBook.empty;
    }
    
    static get empty() {
        return new RecipeBook([]);
    }

    static from(...recipes: Array<Recipe>) {
        return new RecipeBook(recipes);
    }

    private constructor(recipes: Array<Recipe>) {
        this.bookEntries = recipes || [];

        this.nextId = recipes.length > 0
            ? Math.max(...recipes.map(({ id }) => id)) + 1
            : 1;
    }

    get entries() {
        return this.bookEntries;
    }

    add(recipe: Omit<RecipeJSON, 'id'>): RecipeBook {
        return RecipeBook.from(
            ...this.bookEntries,
            new Recipe(
                this.nextId,
                recipe.title,
                recipe.ingredient1,
                recipe.ingredient2,
                recipe.ingredient3,
                recipe.description,
                recipe.favorite,
                new Date(),
            )
        );
    }

    delete(entryId: number): RecipeBook {
        return RecipeBook.from(
            ...this.bookEntries.filter(({ id }) => id !== entryId),
        );
    }

    save() {
        localStorage.setItem('recipes', JSON.stringify(this.bookEntries));
    }
}