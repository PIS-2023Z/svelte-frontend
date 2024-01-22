import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_offer_list } from '$lib';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
	const token = cookies.get('token')!;
	const response = await fetch(`${BACKEND_BASE_URL}/api/offer/all`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	const data = parse_offer_list(await response.text());
	const result = data.find(
		(offer) => offer.id === Number.parseInt(params.slug)
	);
	if (!result) throw error(404);
	return result;
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		console.log('request');
		const data = await request.formData();
		const token = cookies.get('token')!;
		await fetch(`${BACKEND_BASE_URL}/api/offer/delete/${data.get('id')}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			switch (response.status) {
				case 204:
					console.log(response.status);
					throw redirect(303, '/offers/');
					break;

				default:
					console.log(response.status);
					break;
			}
		});
	}
};
