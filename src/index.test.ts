import { max, throws } from '$lib/index';
import { describe, expect, it } from 'vitest';

describe('max test', () => {
	it('compares 1 and 2 to return 2', () => {
		expect(max(1, 2)).toBe(2);
	});
});

describe('throws test', () => {
	it('throws an error', () => {
		expect(() => { throws() }).toThrowError("This is an error.");
	})
})