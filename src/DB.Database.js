var DatabaseConfigs = {
  'FieldsBackgroundColor': '#b7b7b7',
  'FieldsFontSize': 12
};

function Database (fileId) {
  var _file = SpreadsheetApp.openById(fileId);
  var _tables = {};
  
  Object.defineProperties(_tables, {
    'Names': {configurable: false, enumerable: false, get: function () {
      return Object.keys(this).sort(function(a,b){return a.localeCompare(b);});
    }}
  });
  
  

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
    'Export': {configurable: false, enumerable: false, value: function () {
    
    }},
    'Flush': {configurable: false, enumerable: false, value: function () {
      SpreadsheetApp.flush();
    }},
    'Id': {configurable: false, enumerable: true, get: function () {
      return _file.getId();
    }},
    'Import': {configurable: false, enumerable: false, value: function (jsonData) {
    
    }},
    'Name': {configurable: false, enumerable: true, 
      get: function () {return _file.getName();},
      set: function (n) {_file.rename(n); return this;}
    },
    'RemoveTable': {configurable: false, enumerable: false, value: function (name) {
      _tables[name].Delete();
      delete _tables[name];
      delete this[name];
    }},
    'Tables': {configurable: false, enumerable: true, get: function () {
      return _tables;
    }},
    'toString': {configurable: false, enumerable: false, value: function () {
      var o = {};
      var props = Object.getOwnPropertyNames(this).forEach(function (e, i) {
        if (typeof this[e] === 'object') {
          if (e == 'Tables') {var names = []; for (var i=0; i<this[e].length; i++) {names.push(this[e][i].Name);} o[e] = "["+names.join(",")+"]";}
          else {o[e] = '['+this[e].constructor.toString().replace(/function/i, '').split('(')[0].trim()+']';}
        } else {o[e] = this[e];}
      }, this);
      return JSON.stringify(o, null, 4);
    }},    
    '__noSuchMethod__': {configurable: false, enumerable: false, value: function (id, args) {
      Logger.log(id+":"+args);
    }}
  });
    
  _file.getSheets().forEach(function (e, i) {
    var table = new Table(e);
    _tables[table.Name] = table;
    Object.defineProperty(this, ((this.hasOwnProperty(table.Name)) ? "_"+table.Name : table.Name), {configurable: true, enumerable: true, get: function () {
      return table;
    }});
  }, this);

  return this;
  
}


