		Object.defineProperty(this, "Tables", {
			configurable: false, 
			enumerable: false,
			get: function () {
				if (typeof tables === "undefined") {
					tables = [];
					ss.getSheets().forEach(function (sheet) {
						var table = new Db.Table(sheet);
						tables[table.Name] = table;
					});
				}
				return tables;
			}
		});
