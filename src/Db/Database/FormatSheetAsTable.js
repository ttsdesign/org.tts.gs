	function FormatSheetAsTable (sheet, fields) {
		sheet.getRange(1, 1, 1, fields.length).setValues([fields])
			.setBackground("#b7b7b7")
			.setFontSize(12)
			.setFontWeight("bold")
			.setFontLine("underline")
			.setHorizontalAlignment("center");
			sheet.deleteColumns(fields.length+1, sheet.getMaxColumns()-fields.length);
		sheet.setFrozenRows(1);
	}