 'Export': {configurable: false, enumerable: false, value: function (options) {
      if (typeof options === 'undefined') {options={};}
      var data = this.Data;
      if ('AsObjects' in options) {
        data = data.AsObjects;
      }
      var json;
      if ('PrettyPrint' in options) {
        json = JSON.stringify({fields:this.Fields, data:data}, null, 4);
      } else {
        json = JSON.stringify({fields:this.Fields, data:data});
      }
      if ('FolderId' in options) {
        DriveApp.getFolderById(options['FolderId']).createFile(sheet.getParent().getName()+"."+sheet.getName()+"."+Date.now()+".json", json);
      }
      return json;
    }},