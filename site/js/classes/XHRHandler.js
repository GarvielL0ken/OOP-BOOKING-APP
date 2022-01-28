import { XHRRequestData } from './XHRRequestData.js';
export class XHRHandler {
	constructor(requestData= null) {
		/** @private {!currentRequest} */
		this.currentRequest_ = null;

		/** @private {!responseText}*/
		this.responseText_ = null;

		/** @private {!arrRequestData} */
		this.arrRequestData_ = [];
		this.initializeRequestData(requestData);
	}

	initializeRequestData(requestData) {
		var	i;

		i = 0;
		while(requestData[i]) {
			this.addNewRequestData(requestData[i][0], requestData[i][1], requestData[i][2]);
			i++;
		}
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

	addNewRequestData(name, path, callback) {
		var newRequestData = new XHRRequestData(name, path, callback);

		this.arrRequestData_.push(newRequestData);
		if (!this.currentRequest_)
			this.currentRequest_ = newRequestData;
	}

	/*	____STANDARD METHODS____		*/
	/*		____XHR REQUEST METHODS___	*/
	//Send XMLHTTPRequset (xhr) using the data provided in the requestData object
	//Returns the response text
	async fetch(requestData) {
		var	response	=null;
		var	data		=null;
		
		response = await fetch(requestData.path);
		data = await response.text();
		
		return (data);
	}

	async fetchC() {
		return(this.fetch(this.currentRequest_));
	}

	async fetchN(requestName, setToCurrent=false) {
		var tempRequest;

		tempRequest = this.getRequestN(requestName);
		if (setToCurrent)
			this.currentRequest_ = tempRequest;

		return(this.fetch(tempRequest));
	}
}