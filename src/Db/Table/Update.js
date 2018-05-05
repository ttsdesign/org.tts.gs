 'Update': {configurable: false, enumerable: true, value: function (data) {
      if (!data.IsArray()) {data = this.Convert(data);}
      var row = this.Exists(this.Fields[0], data[0]);
      if (row < 1) {return undefined}
      return this.Row(row).Update(data);
    }}