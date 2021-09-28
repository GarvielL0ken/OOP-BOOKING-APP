application = new Vue({
	el : "#application",
	data : {
		checkInDate : "",
		checkOutDate : "",
		numberOfDays : 1,
		hotel : "",
		dailyRate : 0,
		total : 0,
		hotels : [{title : "Alpha",
					dailyRate : 100},
				{title : "Bravo",
					dailyRate : 200},
				{title : "Charlie",
					dailyRate : 50}]
	},
	methods : {
		/*
			Changes either the checkOutDate or numberOfDays depending on
			which field the user changed.
		*/
		updateDates(state) {
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
			}
		},
		updateRates() {
			var	currentHotel;
			var	i;

			i = 0;
			while (this.hotels[i]) {
				currentHotel = this.hotels[i];
				if (currentHotel.title === this.hotel)
					break ;
				i++;
			}
			if ((this.hotels[i]) && (0 < this.numberOfDays)) {
				this.dailyRate = currentHotel.dailyRate;
				this.total = this.dailyRate * this.numberOfDays;
			} else {
				this.dailyRate = 0;
				this.total = 0;
			}
		},
		log() {
			console.log("test");
		}
	}
})	