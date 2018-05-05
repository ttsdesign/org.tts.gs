		Object.defineProperty(this, "AddTable", {
			configurable: false, 
			enumerable: false,
			value: function (name, fields) {
				var sheet = ss.insertSheet(name);
				FormatSheetAsTable(sheet, fields);
				var table = new Table(sheet);
				tables[table.Name] = table;
				return table;
			}
		});
