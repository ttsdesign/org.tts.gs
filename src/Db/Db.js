function Database (fileId, filters) {
  var _file = SpreadsheetApp.openById(dbFileId);
  var _tables = {};
  
  _file.getSheets().forEach(function (e, i) {
    var table = new Table(e);
    _tables[table.Name] = table;
    Object.defineProperty(this, ((this.hasOwnProperty(table.Name)) ? "_"+table.Name : table.Name), {configurable: true, enumerable: true, get: function () {
      return table;
    }});

    if (table.Name in filters) {
      this[table.Name].Filters = filters[table.Name];
    }
  }, this);

  Object.defineProperties(this, {
    'AddTable': {configurable: false, enumerable: false, value: function (name, fields) {
      var sheet = _file.insertSheet(name);
      sheet.getRange(1, 1, 1, fields.length).setValues([fields])
        .setBackground(DatabaseConfigs['FieldsBackgroundColor'])
        .setFontSize(DatabaseConfigs.FieldsFontSize)
        .setFontWeight('bold')
        .setFontLine('underline')
        .setHorizontalAlignment("center");
      sheet.deleteColumns(fields.length+1, sheet.getMaxColumns()-fields.length);
      sheet.setFrozenRows(1);
      
      var table = new Table(sheet);
      _tables[table.Name] = table;
      Object.defineProperty(this, ((this.hasOwnProperty(table.Name)) ? "_"+table.Name : table.Name), {configurable: true, enumerable: true, get: function () {
        return table;
      }});
      return table;
    }},
    'Copy': {configurable: false, enumerable: false, value: function (filename) {
      return _file.copy(filename);
    }},
    'Name': {configurable: false, enumerable: true, 
      get: function () {return _file.getName();},
      set: function (n) {_file.rename(n); return this;}
    },
    'Tables': {configurable: false, enumerable: true, get: function () {
      return Object.keys(_tables).sort(function(a,b){return a.localeCompare(b);});
    }}
  });
   
  return this;
}


function Table (sheet) {
  this.fields;
  this.Filters = {};
    
  Object.defineProperties(this, {
    'Add': {configurable: false, enumerable: false, value: function (data) {
      if (typeof data !== 'object') {return false;}
      if ('Add' in this.Filters) {data = this.Filters.Add(data);}
      if (typeof data === 'undefined') {return false;}
      if (!data.IsArray()) {
        data = this.Convert(data);
      }
      var exists = this.Exists(this.Fields[0], data[0]);
      if (exists > 0) {
        this.Row(exists).Update(data);
      } else {
        sheet.appendRow(data);
      }
      return true;
    }},
    'Convert': {configurabe: false, enumerable: false, value: function (data) {
      if (typeof data !== 'object') {return data;}
      var fields = this.Fields;
      if (data.IsArray()) {
        var o = {};
        for (var i=0; i<fields.length; i++) {
          o[fields[i]] = data[i];
        }
        return o;
      }
      var row = [];
      for (var i=0; i<fields.length; i++) {
        row.push(data[fields[i]]);
      }
      return row;
    }},
    'Data': {configurable: false, enumerable: true, get: function () {
      var data = sheet.getDataRange().getValues().slice(1);
      var table = this;
      Object.defineProperties(data, {
        'AsObjects': {configurable: false, enumerable: false, get: function () {
          var objects = [];
          data.forEach(function (e, i) {
            objects.push(table.Convert(e));
          });
          return objects;
        }
      }});
      return data;      
    }},
    'Delete': {configurable: false, enumerable: false, value: function (field, value) {
      var row = this.Exists(field, value);
      if (row > 0) {
        this.Row(row).Delete();
        return true;
      }
      return false;
    }},
    'Exists': {configurable: false, enumerable: false, value: function (field, value) {
      var data = sheet.getDataRange().getValues();
      var fieldIndex = this.FieldIndex(field);
      if (fieldIndex < 0) {return false;}
      for (var i=1; i<data.length; i++) {
        if (value == data[i][fieldIndex]) {
          return i+1;
        }
      }
      return 0;  
    }},
    'Export': {configurable: false, enumerable: false, value: function (options) {
      if (typeof options === 'undefined') {options={};}
      var data = this.Data;
      if ('AsObjects' in options) {
        data = data.AsObjects;
      }
      var json;
      if ('PrettyPrint' in options) {
        json = JSON.stringify({fields:this.Fields, data:data}, null, 4);
      } else {
        json = JSON.stringify({fields:this.Fields, data:data});
      }
      if ('FolderId' in options) {
        DriveApp.getFolderById(options['FolderId']).createFile(sheet.getParent().getName()+"."+sheet.getName()+"."+Date.now()+".json", json);
      }
      return json;
    }},
    'FieldIndex': {configurable: false, enumerable: false, value: function (field) {
      var fields = this.Fields;
      for (var i=0; i<fields.length; i++) {
        if (field == fields[i]) {
          return i;
        }
      }
      return -1;
    }},
    'Fields': {configurable: false, enumerable: true, get: function () {
      if (typeof this.fields === 'undefined') {
        if ((sheet.getLastRow() == 0) || (sheet.getLastColumn() == 0)) {this.fields = [];}
        else {this.fields = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];}
     }
     return this.fields;
    }},
    'Get': {configurable: false, enumerable: false, value: function (field, value) {
      var row = this.Exists(field, value);
      if (row < 1) {return undefined;}
      var table = this;
      var data = this.Row(row).Values[0];
      Object.defineProperty(data, 'AsObject', {configurable: false, enumerable: false, get: function () {return table.Convert(this);}});
      return data;
    }},
    'Name': {configurable: false, enumerable: true, get: function () {
      return sheet.getName();
    }},
    'Row': {configurable: false, enumerable: false, value: function (i) {
      return new Row(this, sheet.getRange(i, 1, 1, this.Fields.length));
    }},
    'Sheet': {configurable: false, enumerable: true, get: function () {
      return sheet;
    }},
    'Sort': {configurable: false, enumerable: true, value: function (column, asc) {
      if (typeof column === "string") {column = this.FieldIndex(column)+1}
      if (typeof column !== "number") {column = 0}
      if (typeof asc === 'undefined') {asc = true}
      sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).sort({column: column, ascending: asc});
    }},
    'Update': {configurable: false, enumerable: true, value: function (data) {
      if (!data.IsArray()) {data = this.Convert(data);}
      var row = this.Exists(this.Fields[0], data[0]);
      if (row < 1) {return undefined}
      return this.Row(row).Update(data);
    }}
  });


  return this;
}


function Row (table, range) {
  Object.defineProperties(this, {
    'Delete': {configurable: false, enumerable: false, value: function () {
      table.Sheet.deleteRow(range.getRow());
    }},
    'Get': {configurable: false, enumerable: false, value: function (data) {
        if (typeof data === 'undefined') {return range.getValues();}
        if (typeof data === 'number') {return range.getValues()[data];}
        if (typeof data === 'string') {return range.getValues()[table.FieldIndex(data)];}
        return null;
    }},
    'Update': {configurable: false, enumerable: false, value: function (data) {
      range.setValues([data]);
      return true;
    }},
    'Values': {configurable: false, enumerable: false, get: function () {
      return range.getValues();
    }}
 });

  return this;
}

