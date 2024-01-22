import type { ApiOffer, ApiOfferResponse } from './types';

export const enum JobStatus {
	GOING = 'GOING',
	EXPIRED = 'EXPIRED',
	CLOSED = 'CLOSED'
}
export const enum AccountRole {
	EMPLOYEE = 'EMPLOYEE',
	EMPLOYER = 'EMPLOYER'
}
const parse_api = (text: string): any => {
	console.log(text);
	const reviver = (key: string, value: any) => {
		if (typeof value === 'string') {
			let date = new Date(value);
			if (!Number.isNaN(date.valueOf())) return date;
		}
		return value;
	};
	return JSON.parse(text, reviver);
};

export const parse_api_offer: (text: string) => ApiOffer = parse_api;
export const parse_offer_list: (text: string) => ApiOfferResponse = parse_api;

export const backend_url = import.meta.env.BACKEND_BASE_URL;
