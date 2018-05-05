function Table (sheet) {
  var _sheet = sheet;
  
  //var _fields;
  /* Properties
    Indexes, Fields, FieldIndex, AddField, RemoveField, PrimaryKey, SetPrimaryKey
    Export, Import, Copy, Remove
    Count, Data, Objects
    get(primaryKeyValue), get(primaryKeyValue, returnField), get(fieldName, regex), get(fieldName, regex, returnField), get(field, regex, fieldsList)
    Exists(primaryKeyValue), Update(object), Update(row)
    Insert(row), Insert(object)
    Query(q) => {[field, reqex], [fields], sortFunc, page{size, number}}
  */

  Object.defineProperties(this, {
    'AddField': {configurable: false, enumerable: false, value: function (field, index) {
    
    }},
    'Delete': {configurable: false, enumerable: false, value: function () {
      _sheet.getParent().deleteSheet(_sheet);
    }},
    'Fields': {configurable: false, enumerable: true, get: function () {
      if (typeof _fields === 'undefined') {
        if ((_sheet.getLastRow() == 0) || (_sheet.getLastColumn() == 0)) {_fields = [];}
        else {_fields = _sheet.getRange(1, 1, 1, _sheet.getLastColumn()).getValues()[0];}
     }
     return _fields;
    }},
    'Indexes': {configurable: false, enumerable: true, get: function () {
    
    }},
    'Name': {configurable: false, enumerable: true, get: function () {
      return _sheet.getName();
    }}
  });
  
  return this;
}

