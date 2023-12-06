import type { JobStatus } from '$lib';

export type ApiOffer = {
	id: number;
	name: string;
	date_published: Date;
	expiration_date: Date;
	status: JobStatus;
	salary: number | null;
	description: string | null;
};

export type ApiOfferResponse = {
	data: Array<ApiOffer>;
};
