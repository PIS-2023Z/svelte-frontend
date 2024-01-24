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
		const offer_text = await offer_response.text();
		const offers = parse_offer_list(offer_text);
		const offer_id = url.searchParams.get('offerId') ?? '';
		const phrase = url.searchParams.get('phrase') ?? '';
		let fetched_url: string;

		if (offer_id !== '') {
			fetched_url = `${BACKEND_BASE_URL}/api/application/viewByOffer/${offer_id}`;
		} else if (phrase !== '') {
			fetched_url = `${BACKEND_BASE_URL}/api/application/getAppByStr/${phrase}`;
		} else {
			fetched_url = `${BACKEND_BASE_URL}/api/application/get-by-employer`;
		}

		const response = await fetch(fetched_url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const text = await response.text();
		const data = parse_applications(text);
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
		const phrase = data.get('phrase')?.toString() ?? '';
		const option = data.get('search_option')?.toString() as
			| 'text'
			| 'list'
			| null;
		console.log({ option });
		if (option === 'list' && id.trim().length !== 0) {
			url.searchParams.delete('phrase');
			url.searchParams.set('offerId', id);
			redirect(302, url);
		} else if (option === 'text' && phrase.trim().length !== 0) {
			url.searchParams.set('phrase', phrase);
			url.searchParams.delete('offerId');
			redirect(302, url);
		} else {
			url.searchParams.delete('offerId');
			url.searchParams.delete('phrase');
			redirect(302, url);
		}
	}
};
