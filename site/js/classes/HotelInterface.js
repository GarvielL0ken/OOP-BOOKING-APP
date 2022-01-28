export class HotelInterface {
	constructor(numberOfDays) {
		this.numberOfDays = numberOfDays;
		this.hotel = null;
	}

	setNumberOfDays(numberOfDays) {
		this.numberOfDays = numberOfDays;
	}

	getNumberOfDays() {
		return (this.numberOfDays);
	}

	getDailyRate() {
		if (this.hotel)
			return(this.hotel.dailyRate);
		else
			return(0);
	}

	getFeatures() {
		if (this.hotel)
			return(this.hotel.features);
		else
			return("");
	}

	getTotal() {
		var total;

		if (this.hotel) {
			total = this.numberOfDays * this.hotel.dailyRate;
			return (total);
		}
		else
			return (0);
	}

	setHotel(hotelTitle, hotels) {
		var	i;

		i = 0;
		while (hotels[i]) {
			if (hotels[i].title === hotelTitle) {
				this.hotel = hotels[i];
				return (true);
			}
			i++;
		}
		return (false);
	}
}