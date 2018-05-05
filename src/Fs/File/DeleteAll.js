Fs.File.DeleteAll = function (path) {
	var file = Fs.File.Get(path);
	while (file != null) {
		Fs.File.Delete(file);
		file = Fs.File.Get(path);
	}
}