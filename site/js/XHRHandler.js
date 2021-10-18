export class XHRHandler {
	constructor(requestData= null) {
		/** @private {!currentRequest} */
		this.currentRequest_ = requestData;

		/** @private {!responseText}*/
		this.responseText_ = null;

		/** @private {!arrRequestData} */
		if (requestData)
			this.arrRequestData_ = [requestData];
		else
			this.arrRequestData_ = [];
	}

	/*	____ACCESSOR METHODS____	*/
	/*		____GET____				*/
	getRequest() {
		return (this.currentRequest_);
	}

	//Used to find a requestData object by name
	getRequestN(requestName) {
		var i;

		i = 0;
		while(this.arrRequestData_[i]) {
			if (this.arrRequestData_[i].name === requestName)
				return(this.arrRequestData_[i]);
			i++;
		}

		return(false);
	}

	/*		____SET____				*/
	setResponseText(responseText) {
		this.responseText_ = responseText;
	}

	addNewXHRRequestData(xhrRequestData) {
		this.arrRequestData_.push(xhrRequestData);
		if (!this.currentRequest_)
			this.currentRequest_ = xhrRequestData;
	}

	/*	____STANDARD METHODS____		*/
	/*		____XHR REQUEST METHODS___	*/
	//Send XMLHTTPRequset (xhr) using the data provided in the requestData object
	//Returns the respose text
	request(requestData) {
		const	xhr = new XMLHttpRequest();
		
		var		xhrHandler = this;
		
		xhr.open(requestData.method, requestData.path, false);
		
		xhr.onreadystatechange = function () {
			let done = 4;
			let ok = 200;
			if (xhr.readyState === done) {
				if (xhr.status === ok) {
					xhrHandler.setResponseText(this.responseText);
				} else {
					console.log('Error: ' + xhr.status);
				}
			}
		};
		xhr.send();
		return (this.responseText_);
	}

	//Send xhr request using the data stored in the currentRequest object
	//Returns the respose text
	requestC() {
		return(this.request(this.currentRequest_));
	}

	//Send xhr request using the data stored in a request whose name matches the given requestName
	//Set currentRequest to the specified requestData object if setToCurrent is true
	//Returns the respose text
	requestN(requestName, setToCurrent=false) {
		var tempRequest;

		tempRequest = this.getRequestN(requestName);
		if (setToCurrent)
			this.currentRequest_ = tempRequest;

		return(this.request(tempRequest));
	}
}