export class DateInterface {
	constructor() {

	}

	updateDates(parentApplication, interfaces, state) {
		var	i;

		i = 0;
		while (interfaces[i]) {
			interfaces[i].setNumberOfDays(parentApplication.numberOfDays);
			i++;
		}

		if (state === 0)
			this.updateCheckOutDate(parentApplication);
		if (state === 1)
			this.updateNumberOfDays(parentApplication, interfaces);
		//this.updateRates();
	}

	updateCheckOutDate(parentApplication) {
		var objCheckInDate;
		var objCheckOutDate;

		if (parentApplication.numberOfDays > 0 && parentApplication.checkInDate) {
			objCheckInDate = new Date(parentApplication.checkInDate);
			objCheckOutDate = new Date();

			objCheckOutDate.setDate(objCheckInDate.getDate() + parseInt(parentApplication.numberOfDays)); 
			parentApplication.checkOutDate = objCheckOutDate.toJSON();
			parentApplication.checkOutDate = parentApplication.checkOutDate.substring(0, 10);
		}
	}

	updateNumberOfDays(parentApplication, interfaces) {
		const millisecondsInADay = 86400000;
		var	objCheckInDate;
		var	objCheckOutDate;
		var	intTotalNumberOfDays;
		var	milliseconds;
		var	i;
		
		if (parentApplication.checkInDate && parentApplication.checkOutDate) {
			objCheckInDate = new Date(parentApplication.checkInDate);
			objCheckOutDate = new Date(parentApplication.checkOutDate);

			milliseconds = objCheckOutDate.valueOf() - objCheckInDate.valueOf();
			intTotalNumberOfDays = milliseconds / millisecondsInADay;
			if (intTotalNumberOfDays > 0)
				parentApplication.numberOfDays = milliseconds / millisecondsInADay;
			else {
				parentApplication.numberOfDays = 1;
				this.updateCheckOutDate(parentApplication);
			}

			i = 0;
			while (interfaces[i]) {
				interfaces[i].setNumberOfDays(parentApplication.numberOfDays);
				i++;
			}	
		}
	}
}