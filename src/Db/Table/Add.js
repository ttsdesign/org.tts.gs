		Object.defineProperty(this, "Add", {
			configurable: false,
			enumerable: false,
			value: function (data) {
				if (typeof data !== 'object') {
					return false
				}
				//if ("Add" in this.Filters) {data = this.Filters.Add(data)}
				//if (typeof data === 'undefined') {return false}
				data = (data.IsArray()) ? data : this.Convert(data);
				var exists = this.Exists(fields[0], data[0]);
				if (exists > 0) {
					this.Row(exists).Update(data);
				} else {
					sheet.appendRow(data);
				}
				return true;	
			}
		});
