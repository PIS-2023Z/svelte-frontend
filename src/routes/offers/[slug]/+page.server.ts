import type { ApiOfferResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch('/api/offer/all');
	const data: ApiOfferResponse = await response.json();
	const result = data.data.find(
		(offer) => offer.id === Number.parseInt(params.slug)
	);
	if (!result) throw error(404);
	return result;
};
