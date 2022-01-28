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
		hotel1 : "",
		hotel2 : "",
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
		dateInterface : new DateInterface(),
		xhrHandler : new XHRHandler([['get_all_hotels', '../config/get_all_hotels.php'],
										['get_hotel', '../config/get_hotel.php'],
										['get_user_data', '../config/get_user_data.php'],
										['book_hotel', '../config/book_hotel.php']])
	},
	methods : {
		updateCurrentHotel(interfaceIndex) {
			if (interfaceIndex === 1)
				this.interface1.setHotel(this.hotel1, this.hotels);
			else
				this.interface2.setHotel(this.hotel2, this.hotels);
		},
		addNewXHRRequestData(name, path) {
			this.xhrHandler.addNewXHRRequestData(name, path);
		},
		sendEmail(interfaceIndex) {
			var	selectedHotel;

			if (interfaceIndex === 1)
				selectedHotel = this.interface1.hotel;
			else
				selectedHotel = this.interface2.hotel;
		},
		sendRequest(requestName= "", callback, query_parameters="") {
			if (query_parameters)
				this.xhrHandler.fetchQP(requestName, query_parameters).then((response) => callback);
			else if (requestName)
				this.xhrHandler.fetchN(requestName).then((response) => callback(response));
			else
				this.xhrHandler.fetchC().then((response) => callback(response));
		},
		setAllHotels(arrHotels) {
			arrHotels = JSON.parse(arrHotels);
			arrHotels.forEach(function(hotel) {
				application.hotels.push(new Hotel(hotel.title, parseFloat(hotel.daily_rate), hotel.features));
			})
			this.getUserDataFromSession();
		},
		getAllHotels() {
			this.sendRequest('get_all_hotels', this.setAllHotels);
		},
		setUserDataFromSession(userData) {
			console.log(userData);
			userData = JSON.parse(userData);
			console.log(userData);
			console.log(userData.hotel);

			this.checkInDate = userData.checkInDate;
			this.checkOutDate = userData.checkOutDate;
			this.numberOfDays = userData.numberOfDays;
			this.interface1.numberOfDays = userData.numberOfDays;
			this.interface2.numberOfDays = userData.numberOfDays;
			this.hotel1 = userData.hotel;
			this.hotel2 = userData.hotel;
			
			this.updateCurrentHotel(1);
			this.updateCurrentHotel(2);
		},
		getUserDataFromSession() {
			this.sendRequest('get_user_data', this.setUserDataFromSession);
		},
		updateDates(state) {
			var query_parameters;

			this.dateInterface.updateDates(this, [this.interface1, this.interface2], state);
		
			this.sendRequest('update_session_dates', none);
		},
		CDailyRate(objInterface) {
			return(objInterface.getDailyRate().toFixed(2));
		},
		CTotal(objInterface) {
			return(objInterface.getTotal().toFixed(2));
		},
		CFeatures(objInterface) {
			return(objInterface.getFeatures());
		}
	}
})

/*Flow:
		GetAllHotels() {
			getHotelFromSession()
		}
*/
application.getAllHotels();