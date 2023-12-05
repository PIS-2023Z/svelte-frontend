import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch('/api');
	const data = await response.json();
	const result = data.data.find(
		(offer) => offer.id === Number.parseInt(params.slug)
	);
	if (!result) throw error(404);
	return result;
};
