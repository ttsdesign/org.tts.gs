Fs.Folder.Delete = function (path) {
	if (path == "") {
		return;
	}
	var folder = Fs.Folder.Get(path);
	if (folder == null) {
		return;
	}
	Fs.Folder.DeleteFiles(path);
	var i = folder.getFolders();
	while (i.hasNext()) {
		Fs.Folder.Delete(path + "/" + i.next().getName());
	}
	folder.setTrashed(true);
}