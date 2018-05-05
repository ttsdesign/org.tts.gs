		Object.defineProperty(this, "Fields", {
			configurable: false,
			enumerable: true,
			get: function () {
				if (typeof fields === "undefined") {
					if ((sheet.getLastRow() == 0) || (sheet.getLastColumn() == 0)) {
						fields = []
					} else {
						fields = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
					}
				}
				return fields
			}
		});
