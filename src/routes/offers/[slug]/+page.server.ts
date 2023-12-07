import { parse_offer_list } from '$lib';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch('/api/offer/all');
	const data = parse_offer_list(await response.text());
	const result = data.data.find(
		(offer) => offer.id === Number.parseInt(params.slug)
	);
	if (!result) throw error(404);
	return result;
};
