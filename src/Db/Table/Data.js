		Object.defineProperty(this, "Data", {
			configurable: false,
			enumerable: true,
			get: function () {
				var data = sheet.getDataRange().getValues().slice(1);
				var _ = this;
				Object.defineProperty(data, "AsObjects", {
					configurable: false,
					enumerable: false,
					get: function () {
						var objects = [];
						data.forEach(function (e) {
							objects.push(_.Convert(e));
						});
						return objects;
					}
				});
				return data;
			}
		});
