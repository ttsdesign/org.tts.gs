Fs.Folder.Get = function (path) {
	if (path == "") {
		return DriveApp.getRootFolder();
	}
	var folders = path.split("/");
	var navigator = DriveApp.getRootFolder();
	for (var j = 0; j < folders.length; j++) {
		var i = navigator.getFoldersByName(folders[j]);
		if (i.hasNext()) {
			navigator = i.next();
		} else {
			return null;
		}
	}
	return navigator;
}