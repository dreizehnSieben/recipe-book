import Result from 'data/result';

describe('Result', () => {
    describe('construction', () => {
        test('A "Result" can be a "Failure" or a "Success"', () => {
            const fail = Result.failure<string>('Fehler!');
            const ok = Result.success<number>(42);

            expect(fail.isFailure).toBe(true);
            expect(fail.isSuccess).toBe(false);

            expect(ok.isFailure).toBe(false);
            expect(ok.isSuccess).toBe(true);
        });
    });
    describe('pattern matching', () => {
        test('Failure case', () => {
            const fail = Result.failure<string>('Fehler!');

            const result = fail.match({
                failure: (error) => `Failure: ${error}`,
                success: (value) => `Success: ${value}`,
            });

            expect(result).toBe('Failure: Fehler!');
        });

        test('Success case', () => {
            const success = Result.success(42);

            const result = success.match({
                failure: (error) => error,
                success: (value) => value + 3,
            });

            expect(result).toBe(45);
        });
    });
});