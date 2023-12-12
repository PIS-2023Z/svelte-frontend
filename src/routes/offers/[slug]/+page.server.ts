import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_offer_list } from '$lib';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch(`${BACKEND_BASE_URL}/api/offer/all`);
	const data = parse_offer_list(await response.text());
	const result = data.find(
		(offer) => offer.id === Number.parseInt(params.slug)
	);
	if (!result) throw error(404);
	return result;
};

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('request');
		const data = await request.formData();
		await fetch(`${BACKEND_BASE_URL}/api/offer/delete/${data.get('id')}`, {
			method: 'DELETE'
		}).then((response) => {
			switch (response.status) {
				case 204:
					console.log(response.status);
					break;

				default:
					console.log(response.status);
					break;
			}
		});
	}
};
