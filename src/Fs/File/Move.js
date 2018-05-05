Fs.File.Move = function (path, destination) {
	if (!Fs.File.Exists(path)) {
		return false;
	}
	var destination = (Fs.Folder.Exists(destination)) ? Fs.Folder.Get(destination) : Fs.Folder.Create(destination);
	var file = Fs.File.Get(path);
	var i = file.getParents();
	while (i.hasNext()) {
		i.next().removeFile(file);
	}
	return destination.addFile(file);
}