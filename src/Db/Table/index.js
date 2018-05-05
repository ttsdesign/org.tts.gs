function Table (sheet) {

	Object.defineProperty(this, "Sheet", {
		configurable: false, 
		enumerable: false,
		get: function () {
			return sheet;
		}
	});


	var fields;
	Object.defineProperty(this, "Fields", {
		configurable: false, 
		enumerable: false,
		get: function () {
			if (typeof fields === "undefined") {
				LOG("Defining fields...");
				fields = [1,2];
			}
			return fields;
		}
	});

	return this;
}

