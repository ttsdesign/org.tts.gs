 'Sort': {configurable: false, enumerable: true, value: function (column, asc) {
      if (typeof column === "string") {column = this.FieldIndex(column)+1}
      if (typeof column !== "number") {column = 0}
      if (typeof asc === 'undefined') {asc = true}
      sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).sort({column: column, ascending: asc});
    }},