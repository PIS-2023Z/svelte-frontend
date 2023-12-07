import type { ApiOffer } from '$lib/types';
import type { RequestEvent } from './$types';

export const PUT = async ({ request }: RequestEvent) => {
	const data: ApiOffer = await request.json();
	console.log(data);
	return new Response(null, { status: 204 });
};
