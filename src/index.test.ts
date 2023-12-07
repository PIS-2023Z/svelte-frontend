import { JobStatus, parse_api_offer, parse_offer_list } from '$lib';
import type { ApiOffer, ApiOfferResponse } from '$lib/types';
import { describe, expect, it } from 'vitest';

describe('Parse offer test', () => {
	it('parses a single offer', () => {
		let input: ApiOffer = {
			id: 1,
			name: 'name',
			date_published: new Date(),
			expiration_date: new Date(),
			status: JobStatus.AVAILABLE,
			salary: 1000,
			description: 'description'
		};
		let text = JSON.stringify(input);
		let result = parse_api_offer(text);

		expect(result).toEqual(input);
	});
	it('parses a list of offers', () => {
		let offer: ApiOffer = {
			id: 1,
			name: 'name',
			date_published: new Date(),
			expiration_date: new Date(),
			status: JobStatus.AVAILABLE,
			salary: 1000,
			description: 'description'
		};
		let input: ApiOfferResponse = {
			data: [offer]
		};
		let text = JSON.stringify(input);
		let result = parse_offer_list(text);
		let result_data = result.data[0];
		expect(result).toEqual(input);
		expect(result.data).toBeInstanceOf(Array<ApiOffer>);
		expect(result_data).toEqual(offer);
	});
});
