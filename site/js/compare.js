import {HotelInterface} from './HotelInterface.js';

var application = new Vue({
	el : "#application",
	data : {
		hotel1 : "",
		hotel2 : "",
		hotels : [
			{title : "Alpha",
				dailyRate : 100,
				features : "lorem"},
			{title : "Bravo",
				dailyRate : 200,
				features : "ipsum"},
			{title : "Charlie",
				dailyRate : 50,
				features : "dolar"}],
		interface1 : new HotelInterface(),
		interface2 : new HotelInterface()
	},
	methods : {
		updateCurrentHotel(interfaceIndex) {
			console.log("Update Current Hotel: " + interfaceIndex);
			if (interfaceIndex === 1)
				this.interface1.setHotel(this.hotel1, this.hotels);
			else
				this.interface2.setHotel(this.hotel2, this.hotels);
		}
	}
})