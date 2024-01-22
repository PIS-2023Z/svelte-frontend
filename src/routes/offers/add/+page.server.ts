import { BACKEND_BASE_URL } from '$env/static/private';
import { JobStatus } from '$lib';
import type { ApiOffer } from '$lib/types';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, params, cookies }) => {
		const data = await request.formData();
		const token = cookies.get('token')!;

		let salary_str = data.get('salary');
		console.log(salary_str);
		let salary: number | null;
		if (salary_str !== null && !!salary_str) {
			salary = Number.parseInt(salary_str as string);
		} else {
			salary = null;
		}
		let new_data: ApiOffer = {
			id: 0,
			name: data.get('name') as string,
			publishedAt: new Date(),
			expiresAt: new Date(data.get('date') as string),
			status: JobStatus.GOING,
			monthlySalary: salary,
			description: data.get('description') as string | null
		};

		console.log(new_data);

		await fetch(`${BACKEND_BASE_URL}/api/offer/add`, {
			method: 'POST',
			body: JSON.stringify(new_data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			switch (response.status) {
				case 200:
					throw redirect(303, '/offers/');
					break;

				default:
					console.log(response.status);
					throw error(response.status);
					break;
			}
		});
	}
};
