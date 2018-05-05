		Object.defineProperty(this, "Name", {
			configurable: false, 
			enumerable: false,
			get: function () {
				return ss.getName()
			},
			set: function (n) {
				ss.rename(n);
				return this;
			}
		});
