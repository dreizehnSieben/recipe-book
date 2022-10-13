import RecipeBook from 'data/recipe-book';
import Recipe from 'data/recipe';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Recipe book', () => {
    describe('construction', () => {
        test('An empty book', () => {
            const empty = RecipeBook.empty;

            expect(empty.entries).toHaveLength(0);
        });

        test('A book with some recipes', () => {
            const samples = [
                new Recipe(1, 'R1', 'I1-1', 'I1-2', 'I1-3', 'B1', false, new Date()),
                new Recipe(2, 'R2', 'I2-1', 'I2-2', 'I2-3', 'B2', false, new Date()),
                new Recipe(3, 'R3', 'I3-1', 'I3-2', 'I3-3', 'B3', false, new Date()),
            ];

            const book = RecipeBook.from(...samples);

            expect(book.entries).toHaveLength(3);
            expect(book.entries[0].title).toBe('R1');
        });
    });

    describe('methods', () => {
        test('add an entry', () => {
            const empty = RecipeBook.empty;

            expect(empty.entries).toHaveLength(0);

            const book = empty.add({
                title: 'Rezept',
                ingredient1: 'Zutat 1',
                ingredient2: 'Zutat 2',
                ingredient3: 'Zutat 3',
                description: 'Beschreibung',
                favorite: true,
                createAt: new Date(), 
            });

            expect(book.entries).toHaveLength(1);
            expect(book.entries[0].title).toBe('Rezept');
        });

        test('delete an entry', () => {
            const samples = [
                new Recipe(1, 'R1', 'I1-1', 'I1-2', 'I1-3', 'B1', false, new Date()),
                new Recipe(2, 'R2', 'I2-1', 'I2-2', 'I2-3', 'B2', false, new Date()),
                new Recipe(3, 'R3', 'I3-1', 'I3-2', 'I3-3', 'B3', false, new Date()),
            ];

            const book = RecipeBook.from(...samples);

            expect(book.entries).toHaveLength(3);

            const updatedBook = book.delete(1);

            expect(updatedBook.entries).toHaveLength(2);
            expect(updatedBook.entries[0].title).toBe('R2');
        });

        test('save a book', () => {
            const samples = [
                new Recipe(1, 'R1', 'I1-1', 'I1-2', 'I1-3', 'B1', false, new Date()),
                new Recipe(2, 'R2', 'I2-1', 'I2-2', 'I2-3', 'B2', false, new Date()),
                new Recipe(3, 'R3', 'I3-1', 'I3-2', 'I3-3', 'B3', false, new Date()),
            ];

            const book = RecipeBook.from(...samples);

            let spy = jest.spyOn(book, 'save');

            book.save();

            expect(spy).toBeCalled();
        });

        test('load a book', () => {
            let spy = jest
                .spyOn(RecipeBook, 'load')
                .mockImplementation(() => RecipeBook.from(new Recipe(
                    1,
                    'Rezept',
                    'Zutat 1',
                    '',
                    '',
                    'Beschreibung',
                    false,
                    new Date(),
                )));
            
            const book = RecipeBook.load();

            expect(spy).toHaveBeenCalled();
            expect(book.entries).toHaveLength(1);
        });
    });
});