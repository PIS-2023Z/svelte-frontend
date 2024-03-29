import { BACKEND_BASE_URL } from '$env/static/private';
import { JobStatus, parse_offer_list } from '$lib';
import type { ApiOffer } from '$lib/types';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
	const token = cookies.get('employer_token')!;
	const response = await fetch(`${BACKEND_BASE_URL}/api/offer/all`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	const data = parse_offer_list(await response.text());
	const result = data.find(
		(offer) => offer.id === Number.parseInt(params.slug)
	);
	if (!result) throw error(404);
	return { data: result, slug: params.slug };
};

export const actions: Actions = {
	default: async ({ request, params, cookies }) => {
		const data = await request.formData();
		const token = cookies.get('employer_token')!;

		let new_data: ApiOffer = {
			id: Number.parseInt(params.slug ?? '0'),
			name: data.get('name') as string,
			publishedAt: new Date(),
			expiresAt: new Date(data.get('date') as string),
			status: data.get('status') as JobStatus,
			monthlySalary: Number.parseInt(data.get('salary') as string),
			description: data.get('description') as string | null
		};

		console.log(new_data);

		await fetch(`${BACKEND_BASE_URL}/api/offer/update`, {
			method: 'PUT',
			body: JSON.stringify(new_data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			switch (response.status) {
				case 200:
					throw redirect(303, `/offers/${params.slug}`);
					break;

				default:
					console.log(response.status);
					break;
			}
		});
		// throw redirect(303, `/offers/${params.slug}`);
	}
};
