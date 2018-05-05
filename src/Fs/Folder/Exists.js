Fs.Folder.Exists = function (path) {
	if (Fs.Folder.Get(path) == null) {
		return false;
	}
	return true;
}