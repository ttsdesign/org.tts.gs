(function (NS) {
	function Row (table, range) {
		Object.defineProperties(this, {
			"Delete": {configurable: false, enumerable: false, value: function () {
				table.Sheet.deleteRow(range.getRow());
			}},
			"Get": {configurable: false, enumerable: false, value: function (data) {
				if (typeof data === "undefined") {return range.getValues();}
				if (typeof data === "number") {return range.getValues()[data];}
				if (typeof data === "string") {return range.getValues()[table.FieldIndex(data)];}
				return null;
			}},
			"Update": {configurable: false, enumerable: false, value: function (data) {
				range.setValues([data]);
				return true;
			}},
			"Values": {configurable: false, enumerable: false, get: function () {
				return range.getValues();
			}}
		});

		return this;
	}

	NS.Row = Row;

}(Db));
