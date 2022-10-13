interface Pattern<F, S, T, U> {
    failure: (error: F) => T;
    success: (value: S) => U;
}

export default abstract class Result<F, S> {
    static failure<F>(error: F): Result<F, never> {
        return new Failure<F, never>(error);
    }

    static success<S>(value: S): Result<never, S> {
        return new Success<never, S>(value);
    }

    get isFailure() {
        return false;
    }

    get isSuccess() {
        return false;
    }

    abstract match<T, U>(pattern: Pattern<F, S, T, U>): T | U;
}

class Failure<F, S> extends Result<F, S> {
    constructor(readonly error: F) {
        super();
    }

    get isFailure() {
        return true;
    }

    match<T, U>(pattern: Pattern<F, S, T, U>): T {
        return pattern.failure(this.error);
    }
}

class Success<F, S> extends Result<F, S> {
    constructor(readonly value: S) {
        super();
    }

    get isSuccess() {
        return true;
    }

    match<T, U>(pattern: Pattern<F, S, T, U>): U {
        return pattern.success(this.value);
    }
}