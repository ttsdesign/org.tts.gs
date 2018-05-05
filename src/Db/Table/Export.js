		Object.defineProperty(this, "Export", {
			configurable: false,
			enumerable: false,
			value: function (options) {
				if (typeof options === 'undefined') {
					options = {}
				}
				var data = ("AsObjects" in options) ? this.Data.AsObjects : this.Data;
				var json = ("PrettyPrint" in options) ? JSON.stringify({fields: fields, data: data}, null, 4) : JSON.stringify({fields: fields, data: data});
				if ("FolderId" in options) {
					DriveApp.getFolderById(options.FolderId).createFile(sheet.getParent().getName()+"."+sheet.getName()+"."+Date.now()+".json", json);
				}
				return json;			
			}
		});
