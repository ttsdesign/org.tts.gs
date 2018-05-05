Fs.File.GetId = function (path) {
	var file = Fs.File.Get(path);
	return (file == null) ? null : file.getId();
}