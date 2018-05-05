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