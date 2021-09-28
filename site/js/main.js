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
		log() {
			console.log("test");
		}
	}
})	