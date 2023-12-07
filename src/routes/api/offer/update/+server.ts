import { parse_api_offer } from '$lib';
import type { RequestEvent } from './$types';

export const PUT = async ({ request }: RequestEvent) => {
	const data = parse_api_offer(await request.text());
	console.log(data);
	return new Response(null, { status: 204 });
};
