// models/Lot.ts
import type { ILot, LotStatus } from '../types';

export class Lot implements ILot {
	id: string;
	title: string;
	about: string;
	description?: string;
	image: string;

	status: LotStatus;
	datetime: string;
	price: number;
	minPrice: number;
	history?: number[];

	constructor(data: ILot) {
		Object.assign(this, data);
	}

	get formattedDate(): string {
		const date = new Date(this.datetime);
		return date.toLocaleString();
	}

	get isActive(): boolean {
		return this.status === 'active';
	}

	get isWaiting(): boolean {
		return this.status === 'wait';
	}

	get isClosed(): boolean {
		return this.status === 'closed';
	}

	get priceDelta(): number {
		return this.price - this.minPrice;
	}

	get lastBid(): number | null {
		if (!this.history || this.history.length === 0) return null;
		return this.history[this.history.length - 1];
	}

	toJSON(): ILot {
		return {
			id: this.id,
			title: this.title,
			about: this.about,
			description: this.description,
			image: this.image,
			status: this.status,
			datetime: this.datetime,
			price: this.price,
			minPrice: this.minPrice,
			history: this.history,
		};
	}
}
