 'Delete': {configurable: false, enumerable: false, value: function (field, value) {
      var row = this.Exists(field, value);
      if (row > 0) {
        this.Row(row).Delete();
        return true;
      }
      return false;
    }},