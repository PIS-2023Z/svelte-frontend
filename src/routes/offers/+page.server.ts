import { parse_offer_list } from '$lib';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/offer/all');
	// const data: ApiOfferResponse = await response.json();
	const data = parse_offer_list(await response.text());
	return data;
};
