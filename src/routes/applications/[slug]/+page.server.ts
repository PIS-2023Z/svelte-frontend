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

const base64ToBlob = (data: string, mime_type: string): Blob => {
	const chars = atob(data);
	const numbers = new Array(chars.length);
	for (let i = 0; i < chars.length; i++) {
		numbers[i] = chars.charCodeAt(i);
	}
	const byte_array = new Uint8Array(numbers);
	return new Blob([byte_array], { type: mime_type });
};

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const token = cookies.get('employer_token')!;
		const data = await request.formData();
		const id = data.get('id')!.toString();
		console.log(id);
		const response = await fetch(
			`${BACKEND_BASE_URL}/api/cv/download-bin/${id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
					// 'Content-Type': 'application/pdf'
				}
			}
		);
		console.log(await response.text());
		return {
			...response,
			headers: { 'Content-Disposition': 'attachment; filename=cv.pdf' }
		};
		// const blob = await response.blob();
		// console.log(blob.type);
		// console.log(await blob.text());
		// const pdf_data = JSON.parse(await blob.text()) as {
		// 	id: string;
		// 	data: { type: number; data: string };
		// };
		// console.log('parsed');
		// const pdf_blob = base64ToBlob(pdf_data.data.data, 'application/pdf');

		// console.log('blobed');
		// return {
		// 	status: 200,
		// 	headers: {
		// 		'Content-Type': 'application/pdf',
		// 		'Content-Disposition': 'attachment; filename=cv.pdf'
		// 	},
		// 	body: pdf_blob
		// };
	}
};
