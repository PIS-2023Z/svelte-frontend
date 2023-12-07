import type { ApiOfferResponse } from '$lib/types';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/offer/all');
	const data: ApiOfferResponse = await response.json();
	return data;
};
