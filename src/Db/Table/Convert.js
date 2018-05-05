		Object.defineProperty(this, "Convert", {
			configurable: false,
			enumerable: false,
			value: function (data) {
				if (typeof data !== 'object') {
					return data
				}
				if (data.IsArray()) {
					var o = {};
					fields.forEach(function (e, i) {
						o[e] = data[i]
					});
					return o;
				}
				var row = [];
				fields.forEach(function (e, i) {
					row.push(data[e]);
				});
				return row;
			}
		});
