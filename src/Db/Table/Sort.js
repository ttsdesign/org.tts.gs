		Object.defineProperty(this, "Sort", {
			configurable: false,
			enumerable: true,
			value: function (column, desc) {
				if (typeof column === "string") {
					column = this.FieldIndex(column)+1
				}
				if (typeof column !== "number") {
					column = 0
				}
				if (typeof desc === "undefined" || desc === false || desc === 0) {
					desc = false
				} else {
					desc = true
				}
				sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).sort({column: column, ascending: !desc});
			}
		});
