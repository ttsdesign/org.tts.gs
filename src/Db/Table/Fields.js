'Fields': {configurable: false, enumerable: true, get: function () {
      if (typeof this.fields === 'undefined') {
        if ((sheet.getLastRow() == 0) || (sheet.getLastColumn() == 0)) {this.fields = [];}
        else {this.fields = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];}
     }
     return this.fields;
    }},