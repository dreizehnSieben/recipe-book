import Result from 'data/result';

export interface RecipeJSON {
    id: number;
    title: string;
    ingredient1: string;
    ingredient2: string;
    ingredient3: string;
    description: string;
    favorite: boolean;
    createAt: Date;
}

// helper
export function isRecipeJSON(value: Object | RecipeJSON): value is RecipeJSON {
    return [
        'id',
        'title',
        'ingredient1',
        'ingredient2',
        'ingredient3',
        'description',
        'favorite',
        'createAt',
    ].every((prop) => prop in value);
}

export default class Recipe {
    static from(jsonString: string): Result<string, Recipe> {
        const parsed = JSON.parse(jsonString);

        if (isRecipeJSON(parsed)) {
            return Result.success(new Recipe(
                parsed.id,
                parsed.title,
                parsed.ingredient1,
                parsed.ingredient2,
                parsed.ingredient3,
                parsed.description,
                parsed.favorite,
                parsed.createAt,
            ));
        } 
        return Result.failure('Invalid data');   
    }

    constructor(
        public id: number,
        public title: string,
        public ingredient1: string,
        public ingredient2: string,
        public ingredient3: string,
        public description: string,
        public favorite: boolean,
        readonly createAt: Date,
    ) {}
}