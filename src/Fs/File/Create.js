Fs.File.Create = function (path, data) {
	var folder = (Fs.Folder.Exists(Path.Directory(path))) ? Fs.Folder.Get(Path.Directory(path)) : Fs.Folder.Create(Path.Directory(path));
	if (typeof(data) === "object") {
		data.setName(Path.File(path));
	} else {
		data = Utilities.newBlob(data).setName(Path.File(path));
	}
	return folder.createFile(data);
}