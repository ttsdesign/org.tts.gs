		Object.defineProperty(this, "Name", {
			configurable: false,
			enumerable: true,
			get: function () {
				return sheet.getName()
			}
		});
