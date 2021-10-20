import { Hotel } from './Hotel.js';
import { HotelInterface } from './HotelInterface.js';
import { XHRHandler } from './XHRHandler.js';
import { XHRRequestData } from './XHRRequestData.js';

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
			{title : "Alpha",
				dailyRate : 100},
			{title : "Bravo",
				dailyRate : 200},
			{title : "Charlie",
				dailyRate : 50}
			],
		interface : new HotelInterface(1),
		xhrHandler : new XHRHandler([['test', '../config/test.php'], ['get_all_hotels', '../config/get_all_hotels.php']])
	},
	methods : {
		addNewXHRRequestData(name, path) {
			this.xhrHandler.addNewXHRRequestData(name, path);
		},
		setAllHotels(arrHotels) {
			console.log("arrHotels: " + typeof(arrHotels));
			arrHotels = JSON.parse(arrHotels);
			arrHotels.forEach(function(hotel) {
				application.hotels.push(new Hotel(hotel.title, hotel.daily_rate));
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
			this.interface.setNumberOfDays(this.numberOfDays);
			if (state === 0)
				this.updateCheckOutDate();
			if (state === 1)
				this.updateNumberOfDays();
			this.updateRates();
		},
		updateCheckOutDate() {
			var objCheckInDate;
			var objCheckOutDate;

			if (this.numberOfDays > 0 && this.checkInDate) {
				objCheckInDate = new Date(this.checkInDate);
				objCheckOutDate = new Date();

				objCheckOutDate.setDate(objCheckInDate.getDate() + parseInt(this.numberOfDays)); 
				this.checkOutDate = objCheckOutDate.toJSON();
				this.checkOutDate = this.checkOutDate.substring(0, 10);
			}
		},
		updateNumberOfDays() {
			const millisecondsInADay = 86400000;
			var objCheckInDate;
			var objCheckOutDate;
			var intTotalNumberOfDays;
			var milliseconds;
			
			if (this.checkInDate && this.checkOutDate) {
				objCheckInDate = new Date(this.checkInDate);
				objCheckOutDate = new Date(this.checkOutDate);

				milliseconds = objCheckOutDate.valueOf() - objCheckInDate.valueOf();
				intTotalNumberOfDays = milliseconds / millisecondsInADay;
				if (intTotalNumberOfDays > 0)
					this.numberOfDays = milliseconds / millisecondsInADay;
				else {
					this.numberOfDays = 1;
					this.updateCheckOutDate();
				}
				this.interface.setNumberOfDays(this.numberOfDays);
			}
		},
		updateRates() {
			var	currentHotel;
			var	i;

			if (this.interface.setHotel(this.hotel, this.hotels) && (0 < this.numberOfDays)) {
				this.dailyRate = this.interface.getDailyRate();
				this.total = this.interface.getTotal();
			} else {
				this.dailyRate = 0;
				this.total = 0;
			}
		}
	}
})

application.sendRequest('get_all_hotels', application.setAllHotels);