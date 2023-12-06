import type { ApiOffer } from './types';

export const enum JobStatus {
	AVAILABLE = 'Available',
	EXPIRED = 'Expired',
	CLOSED = 'Closed'
}

export class JobOffer {
	name: string;
	private _publishing_date: Date;
	private _expiration_date: Date;
	status: JobStatus;
	private _salary: number | null;
	description: string | null;

	constructor(
		name: string,
		expiration_date: Date,
		date_published: Date,
		salary?: number | null,
		description?: string | null
	) {
		this.name = name;
		this.expiration_date = expiration_date;
		this.publishing_date = date_published;
		this.status = JobStatus.AVAILABLE;
		this.salary = salary ?? null;
		this.description = description ?? null;
	}

	set salary(new_salary: number | null) {
		if (new_salary !== null && new_salary < 0)
			throw new RangeError('Salary value must be positive.');
		this._salary = new_salary;
	}
	get salary(): number | null {
		return this._salary;
	}

	set expiration_date(new_date: Date) {
		if (!this._check_expiration_dates())
			throw new RangeError(
				'Expiration date must be later than publishing date.'
			);

		this._expiration_date = new_date;
	}

	get expiration_date(): Date {
		return this._expiration_date;
	}

	set publishing_date(new_date: Date) {
		if (!this._check_expiration_dates())
			throw new RangeError(
				'Publishing date must be earlier than expiration date.'
			);

		this._publishing_date = new_date;
	}
	get publishing_date(): Date {
		return this._publishing_date;
	}

	private _check_expiration_dates(): boolean {
		if (
			this._expiration_date === undefined ||
			this._publishing_date === undefined
		)
			return true;
		if (this._publishing_date.getTime() > this._expiration_date.getTime())
			return false;
		return true;
	}

	static from_api_offer(data: ApiOffer): JobOffer {
		return new JobOffer(
			data.name,
			data.expiration_date,
			data.date_published,
			data.salary,
			data.description
		);
	}
}
