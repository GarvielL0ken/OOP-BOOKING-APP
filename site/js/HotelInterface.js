export class HotelInterface {
	constructor(numberOfDays) {
		this.numberOfDays = numberOfDays;
		this.hotel = null;
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
		if (this.hotel)
			return (this.numberOfDays * this.hotel.dailyRate);
		else
			return (0);
	}

	setHotel(hotelTitle, hotels) {
		var	i;

		i = 0;
		while (hotels[i]) {
			if (hotels[i].title === hotelTitle) {
				this.hotel = hotels[i];
				break ;
			}
			i++;
		}
		console.log(this.hotel.title);
	}
}