export function max(a: number, b: number): number {
    if (a > b)
        return a;
    return b;
};

export function throws(): never {
    throw new Error("This is an error.");
};