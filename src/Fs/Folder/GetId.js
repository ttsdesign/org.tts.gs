Fs.Folder.GetId = function (path) {
	var folder = Fs.Folder.Get(path);
	return (folder == null) ? null : folder.getId();
}