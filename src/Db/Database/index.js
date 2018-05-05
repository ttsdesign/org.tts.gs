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

/*~IncludeFile("AddTable.js")~*/
/*~IncludeFile("Copy.js")~*/
/*~IncludeFile("Name.js")~*/
/*~IncludeFile("Tables.js")~*/
		
		if (typeof lazyLoad !== "undefined") {
			this.Tables;
		}
		
		return this;

	}

/*~IncludeFile("FormatSheetAsTable.js")~*/

	NS.Database = Database;

}(Db));
