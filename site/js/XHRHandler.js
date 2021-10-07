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
		while(this.arrRequestData[i]) {
			if (this.arrRequestData[i].name === requestName)
				return(this.arrRequestData[i]);
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
		
		console.log("Method: " + requestData.method);
		console.log("Path: " + requestData.path);
		//xhr.addEventListener("load", this.requestResponseText);
		
		xhr.open(requestData.method, requestData.path, false);
		
		// Track the state changes of the request.
		xhr.onreadystatechange = function () {
			let done = 4; // readyState 4 means the request is done.
			let ok = 200; // status 200 is a successful return.
			if (xhr.readyState === done) {
				if (xhr.status === ok) {
					xhrHandler.setResponseText(this.responseText);
				} else {
					console.log('Error: ' + xhr.status); // An error occurred during the request.
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