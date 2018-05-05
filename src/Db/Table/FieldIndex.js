		Object.defineProperty(this, "FieldIndex", {
			configurable: false,
			enumerable: true,
			value: function (field) {
				for (var i=0; i<fields.length; i++) {
					if (field == fields[i]) {
						return i
					}
				}
				return -1;
			}
		});
