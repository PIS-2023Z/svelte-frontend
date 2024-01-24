import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_applications, parse_offer_list } from '$lib';
import type { ApiOfferResponse, ApplicationData } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
	const token = cookies.get('employer_token') ?? '';
	const logged_in = token !== '';
	if (logged_in) {
		const offer_response = await fetch(
			`${BACKEND_BASE_URL}/api/offer/get-employers`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		const offer_id = url.searchParams.get('offerId') ?? '';
		const offer_text = await offer_response.text();
		const offers = parse_offer_list(offer_text);
		let data: Array<ApplicationData>;
		if (offer_id === '') {
			const response = await fetch(
				`${BACKEND_BASE_URL}/api/application/get-by-employer`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			const text = await response.text();
			data = parse_applications(text);
		} else {
			const response = await fetch(
				`${BACKEND_BASE_URL}/api/application/viewByOffer/${offer_id}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			const text = await response.text();
			data = parse_applications(text);
		}
		return {
			data: data,
			offers,
			offer_id: offer_id !== '' ? Number.parseInt(offer_id) : undefined
		};
	} else {
		return {
			data: [] as Array<ApplicationData>,
			offers: [] as ApiOfferResponse
		};
	}
};

export const actions: Actions = {
	default: async ({ url, request }) => {
		const data = await request.formData();
		const id = data.get('select_list')?.toString() ?? '';
		console.log('filtering...');
		console.log({ id });
		if (id.trim().length === 0) {
			url.searchParams.delete('offerId');
			redirect(302, url);
		} else {
			url.searchParams.set('offerId', id);
			redirect(302, url);
		}
	}
};
