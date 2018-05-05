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