  'Get': {configurable: false, enumerable: false, value: function (field, value) {
      var row = this.Exists(field, value);
      if (row < 1) {return undefined;}
      var table = this;
      var data = this.Row(row).Values[0];
      Object.defineProperty(data, 'AsObject', {configurable: false, enumerable: false, get: function () {return table.Convert(this);}});
      return data;
    }},