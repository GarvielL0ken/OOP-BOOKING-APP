application = new Vue({
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
		interface1 : {
			numberOfDays : 2
		},
		interface2 : {
			numberOfDays : 2
		}
	},
	methods : {
		updateCurrentHotel(interfaceIndex) {
			console.log("Update Current Hotel: " + interfaceIndex);
			if (interfaceIndex === 1)
				this.interface1.setHotel(this.hotel1);
			else
				this.interface2.setHotel(this.hotel2);
		}
	}
})