import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.delete('employer_email', { path: '/' });
	cookies.delete('employer_token', { path: '/' });
	redirect(302, '/');
};
