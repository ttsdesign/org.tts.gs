(function (NS) {
	
	function Table (sheet) {
		var fields;

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

		Object.defineProperty(this, "Delete", {
			configurable: false,
			enumerable: false,
			value: function (field, value) {
				var row = this.Exists(field, value);
				if (row > 0) {
					this.Row(row).Delete();
					return true;
				}
				return false;
			}
		});

		Object.defineProperty(this, "Exists", {
			configurable: false,
			enumerable: true,
			value: function (field, value) {
				if (!fields.Contains(field)) {
					return -1;
				}
				var fieldIndex = this.FieldIndex(field);
				var data = sheet.getDataRange().getValues();
				for (var i=1; i<data.length; i++) {
					if (value == data[i][fieldIndex]) {
						return i+1;
					}
				}
				return 0;
			}
		});

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

		Object.defineProperty(this, "FieldIndex", {
			configurable: false,
			enumerable: true,
			value: function (field) {
				for (var i=0; i<fields.length; i++) {
					if (field == fields[i]) {
						return i
					}
				}
				return -1;
			}
		});

		Object.defineProperty(this, "Fields", {
			configurable: false,
			enumerable: true,
			get: function () {
				if (typeof fields === "undefined") {
					if ((sheet.getLastRow() == 0) || (sheet.getLastColumn() == 0)) {
						fields = []
					} else {
						fields = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
					}
				}
				return fields
			}
		});

		Object.defineProperty(this, "Get", {
			configurable: false,
			enumerable: false,
			value: function (field, value) {
				var row = this.Exists(field, value);
				if (row < 1) {
					return undefined
				}
				var _ = this;
				var data = this.Row(row).Values[0];
				Object.defineProperty(data, "AsObject", {
					configurable: false, 
					enumerable: false,
					get: function () {
						return _.Convert(this)
					}
				});
				return data;
			}
		});

		Object.defineProperty(this, "Name", {
			configurable: false,
			enumerable: true,
			get: function () {
				return sheet.getName()
			}
		});

		Object.defineProperty(this, "Row", {
			configurable: false,
			enumerable: false,
			value: function (i) {
				return new Db.Row(this, sheet.getRange(i, 1, 1, fields.length));		
			}
		});

		Object.defineProperty(this, "Sheet", {
			configurable: false, 
			enumerable: false,
			get: function () {
				return sheet;
			}
		});

		Object.defineProperty(this, "Sort", {
			configurable: false,
			enumerable: true,
			value: function (column, desc) {
				if (typeof column === "string") {
					column = this.FieldIndex(column)+1
				}
				if (typeof column !== "number") {
					column = 0
				}
				if (typeof desc === "undefined" || desc === false || desc === 0) {
					desc = false
				} else {
					desc = true
				}
				sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).sort({column: column, ascending: !desc});
			}
		});

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


		return this;
	}

	NS.Table = Table;

}(Db));

