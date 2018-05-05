Fs.Folder.Move = function (path, destination) {
	var folder = Fs.Folder.Get(path);
	if (folder == null) {
		return false;
	}
	destination = (Fs.Folder.Exists(destination)) ? Fs.Folder.Get(destination) : Fs.Folder.Create(destination);
	var i = folder.getParents();
	while (i.hasNext()) {
		i.next().removeFolder(folder);
	}
	return destination.addFolder(folder);
}