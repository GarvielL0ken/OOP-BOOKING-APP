application = new Vue({
	el : "#application",
	data : {
		checkInDate : "",
		checkOutDate : "",
		numberOfDays : 1
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
		},
		updateCheckOutDate() {
			console.log("updateCheckOutDate");
			console.log("Number of Days: " + this.numberOfDays)
			console.log("Check In Date: " + this.checkInDate);
			
			
		},
		updateNumberOfDays() {
			console.log("updateNumberOfDays");
		},
		log() {
			console.log("test");
		}
	}
})	