Fs.File.Get = function (path) {
	if (!Fs.Folder.Exists(Path.Directory(path))) {
		return null;
	}
	var folder = Fs.Folder.Get(Path.Directory(path));
	var i = folder.getFilesByName(Path.File(path));
	return (i.hasNext()) ? i.next() : null;
}