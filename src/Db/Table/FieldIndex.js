 'FieldIndex': {configurable: false, enumerable: false, value: function (field) {
      var fields = this.Fields;
      for (var i=0; i<fields.length; i++) {
        if (field == fields[i]) {
          return i;
        }
      }
      return -1;
    }},