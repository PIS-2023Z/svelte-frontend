import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_offer_list } from '$lib';
import type { ApiOfferResponse } from '$lib/types';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const token = cookies.get('employer_token') ?? '';
	const logged_in = token !== '';
	if (logged_in) {
		const response = await fetch(
			`${BACKEND_BASE_URL}/api/offer/get-employers`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		console.log(response.status);
		const text = await response.text();
		console.log(text);
		const data = parse_offer_list(text);
		return { data: data };
	} else {
		return { data: [] as ApiOfferResponse };
	}
};
