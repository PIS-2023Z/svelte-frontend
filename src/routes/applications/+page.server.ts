import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_applications } from '$lib';
import type { ApplicationData } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('employer_token') ?? '';
	const logged_in = token !== '';
	if (logged_in) {
		const response = await fetch(
			`${BACKEND_BASE_URL}/api/application/get-by-employer`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		console.log(response.status);
		const text = await response.text();
		const data = parse_applications(text);
		console.log(text);
		return { data: data };
	} else {
		return { data: [] as Array<ApplicationData> };
	}
};
