import { DateInterface } from './classes/DateInterface.js';
import { Hotel } from './classes/Hotel.js';
import { HotelInterface } from './classes/HotelInterface.js';
import { XHRHandler } from './classes/XHRHandler.js';

var application = new Vue({
	el : "#application",
	data : {
		checkInDate : "",
		checkOutDate : "",
		numberOfDays : 1,
		hotel : "",
		dailyRate : 0,
		total : 0,
		hotels : [
			{title : "",
				dailyRate : 0},
			{title : "Alpha",
				dailyRate : 100},
			{title : "Bravo",
				dailyRate : 200},
			{title : "Charlie",
				dailyRate : 50},
			
			],
		interface : new HotelInterface(1),
		dateInterface : new DateInterface(1),
		xhrHandler : new XHRHandler([['get_all_hotels', '../config/get_all_hotels.php']])
	},
	methods : {
		updateCurrentHotel() {
			this.interface.setHotel(this.hotel, this.hotels);
		},
		addNewXHRRequestData(name, path) {
			this.xhrHandler.addNewXHRRequestData(name, path);
		},
		setAllHotels(arrHotels) {
			arrHotels = JSON.parse(arrHotels);
			arrHotels.forEach(function(hotel) {
				application.hotels.push(new Hotel(hotel.title, parseFloat(hotel.daily_rate)));
			})
		},
		getAllHotels() {
			this.sendRequest('get_all_hotels', this.setAllHotels);
		},
		sendRequest(requestName= "", callback) {
			if (requestName)
				this.xhrHandler.fetchN(requestName).then((response) => callback(response));
			else
				this.xhrHandler.fetchC().then((response) => callback(response));
		},
		updateDates(state) {
			this.dateInterface.updateDates(this, [this.interface], state);
		},
	},
	computed: {
		CDailyRate() {
			return(this.interface.getDailyRate().toFixed(2));
		},
		CTotal() {
			return(this.interface.getTotal().toFixed(2));
		}
	}
})

application.sendRequest('get_all_hotels', application.setAllHotels);