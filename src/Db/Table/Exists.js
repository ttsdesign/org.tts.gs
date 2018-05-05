		Object.defineProperty(this, "Exists", {
			configurable: false,
			enumerable: true,
			value: function (field, value) {
				if (!fields.Contains(field)) {
					return -1;
				}
				var fieldIndex = this.FieldIndex(field);
				var data = sheet.getDataRange().getValues();
				for (var i=1; i<data.length; i++) {
					if (value == data[i][fieldIndex]) {
						return i+1;
					}
				}
				return 0;
			}
		});
