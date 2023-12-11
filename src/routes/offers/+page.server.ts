import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_offer_list } from '$lib';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch }) => {
	console.log(`${BACKEND_BASE_URL}`);
	const response = await fetch(`${BACKEND_BASE_URL}/api/offer/all`);
	// const data: ApiOfferResponse = await response.json();
	const data = parse_offer_list(await response.text());
	return { data: data };
};
