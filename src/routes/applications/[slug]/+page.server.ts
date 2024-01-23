import { BACKEND_BASE_URL } from '$env/static/private';
import { parse_application } from '$lib';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, cookies }) => {
	const token = cookies.get('employer_token')!;
	const response = await fetch(
		`${BACKEND_BASE_URL}/api/application/view/${params.slug}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	return parse_application(await response.text());
};

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const token = cookies.get('employer_token')!;
		const data = await request.formData();
		const id = data.get('id')!.toString();
		console.log(id);
		const response = await fetch(`${BACKEND_BASE_URL}/api/cv/files/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/pdf'
			}
		});
		console.log(response.status);
		const blob = await response.blob();
		console.log(blob.type);
		console.log(await blob.text());
		const pdf_data = JSON.parse(await blob.text()) as {
			id: string;
			data: { type: number; data: string };
		};
		const pdf_blob = new Blob([pdf_data.data.data]);
		return {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename=cv.pdf'
			},
			body: pdf_blob
		};
	}
};
