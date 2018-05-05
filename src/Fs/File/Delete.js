Fs.File.Delete = function (path) {
	var file = Fs.File.Get(path);
	if (file == null) {
		return false;
	}
	return file.setTrashed(true);
}