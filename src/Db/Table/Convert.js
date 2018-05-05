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