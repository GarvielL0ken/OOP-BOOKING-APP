import { HotelInterface } from './HotelInterface.js';
import { XHRHandler } from './XHRHandler.js';
import { XHRRequestData } from './XHRRequestData.js';

var application = new Vue({
	el : "#application",
	data : {
		hotel1 : "",
		hotel2 : "",
		numberOfDays : 2,
		xhrResponseText : "Initial Text",
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
		interface1 : new HotelInterface(2),
		interface2 : new HotelInterface(2),
		xhrHandler : new XHRHandler()
	},
	methods : {
		updateCurrentHotel(interfaceIndex) {
			console.log("Update Current Hotel: " + interfaceIndex);
			if (interfaceIndex === 1)
				this.interface1.setHotel(this.hotel1, this.hotels);
			else
				this.interface2.setHotel(this.hotel2, this.hotels);
		},
		addXHRRequestData(name, method, path) {
			var xhrRequestData;

			xhrRequestData = new XHRRequestData(name, method, path);
			console.log(xhrRequestData);
			this.xhrHandler.addNewXHRRequestData(xhrRequestData);
			console.log(this.xhrHandler);
		},
		getHotelFromSession() {
			var	hotelName;

			hotelName = JSON.parse(this.xhrHandler.requestC());
			console.log(hotelName);
			this.hotel1 = hotelName;
			this.hotel2 = hotelName;
			this.updateCurrentHotel(1);
			this.updateCurrentHotel(2);
		}
	}
})

application.addXHRRequestData('get_hotel', 'GET', '../config/get_hotel.php');
application.getHotelFromSession();