Fs.Folder.DeleteFiles = function (path) {
	var folder = Fs.Folder.Get(path);
	if (folder == null) {
		return false;
	}
	var i = folder.getFiles();
	while (i.hasNext()) {
		i.next().setTrashed(true);
	}
}