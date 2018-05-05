Fs.File.Exists = function (path) {
	if (!Fs.Folder.Exists(Path.Directory(path))) {
		return false;
	}
	var folder = Fs.Folder.Get(Path.Directory(path));
	var i = folder.getFilesByName(Path.File(path));
	return (i.hasNext()) ? true : false;
}