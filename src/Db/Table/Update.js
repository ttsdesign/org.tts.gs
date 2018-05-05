		Object.defineProperty(this, "Update", {
			configurable: false,
			enumerable: true,
			value: function (data) {
				if (!data.IsArray()) {
					data = this.Convert(data)
				}
				var row = this.Exists(fields[0], (data.IsArray()) ? data[0] : data[fields[0]]);
				if (row < 1) {
					return undefined
				}
				return this.Row(row).Update((data.IsArray()) ? data : this.Convert(data));
			}
		});
