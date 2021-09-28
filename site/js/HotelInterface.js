export class HotelInterface {
	constructor() {
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

	setHotel(hotelTitle, hotels) {
		var	i;

		i = 0;
		while (hotels[i]) {
			if (hotels[i].title === hotelTitle) {
				this.hotel = hotels[i];
			}
			i++;
		}
		console.log(this.hotel.title);
	}
}