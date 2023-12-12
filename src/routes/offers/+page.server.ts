import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_offer_list } from '$lib';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch(`${BACKEND_BASE_URL}/api/offer/all`);
	const data = parse_offer_list(await response.text());
	return { data: data };
};
