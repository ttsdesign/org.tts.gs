		Object.defineProperty(this, "Row", {
			configurable: false,
			enumerable: false,
			value: function (i) {
				return new Db.Row(this, sheet.getRange(i, 1, 1, fields.length));		
			}
		});
