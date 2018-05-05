(function (NS) {
	function Database (ss, lazyLoad) {
		var tables;

		if (typeof ss == "object" && "getSpreadsheetTimeZone" in ss) { // Spreadsheet File Object
			ss = ss;
		} else if (typeof ss == "object" && "showSheet" in ss) { // Sheet Object
			ss = ss.getParent();
		} else if (typeof ss == "object" && "getMimeType" in ss && MimeType.GOOGLE_SHEETS == ss.getMimeType()) { // File Object
			try { ss = SpreadsheetApp.open(ss) } catch (e) { }
		} else if (typeof ss == "string" && ss.startsWith("https://")) { // File Url
			try { ss = SpreadsheetApp.openByUrl(ss) } catch (e) { }
		} else if (typeof ss == "string" && Fs.File.Exists(ss)) { // File Path
			try { ss = SpreadsheetApp.open(Fs.File.Get(ss)) } catch (e) { }
		} else { // File ID
			try { ss = SpreadsheetApp.openById(ss) } catch (e) { }
		}

		Object.defineProperty(this, "SS", {
			configurable: false, 
			enumerable: false,
			get: function () {
				return ss;
			}
		});

		Object.defineProperty(this, "AddTable", {
			configurable: false, 
			enumerable: false,
			value: function (name, fields) {
				var sheet = ss.insertSheet(name);
				FormatSheetAsTable(sheet, fields);
				var table = new Db.Table(sheet);
				tables[table.Name] = table;
				return table;
			}
		});

		Object.defineProperty(this, "Copy", {
			configurable: false, 
			enumerable: false,
			value: function (filename) {
				return ss.copy(filename);
			}
		});

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

		
		if (typeof lazyLoad !== "undefined") {
			this.Tables;
		}
		
		return this;

	}

	function FormatSheetAsTable (sheet, fields) {
		sheet.getRange(1, 1, 1, fields.length).setValues([fields])
			.setBackground("#b7b7b7")
			.setFontSize(12)
			.setFontWeight("bold")
			.setFontLine("underline")
			.setHorizontalAlignment("center");
			sheet.deleteColumns(fields.length+1, sheet.getMaxColumns()-fields.length);
		sheet.setFrozenRows(1);
	}

	NS.Database = Database;

}(Db));
