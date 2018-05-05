Fs = {
	"File": {
		"Create": function(path, data) {
			var folder = (Folder.Exists(Path.Directory(path))) ? Folder.Get(Path.Directory(path)) : Folder.Create(Path.Directory(path));
			if (typeof(data) === "object") {
				data.setName(Path.File(path));
			} else {
				data = Utilities.newBlob(data).setName(Path.File(path));
			}
			return folder.createFile(data);
		},
		"Delete": function(path) {
			var file = File.Get(path);
			if (file == null) {
				return false;
			}
			return file.setTrashed(true);
		},
		"DeleteAll": function(path) {
			var file = File.Get(path);
			while (file != null) {
				File.Delete(file);
				file = File.Get(path);
			}
		},
		"Exists": function(path) {
			if (!Folder.Exists(Path.Directory(path))) {
				return false;
			}
			var folder = Folder.Get(Path.Directory(path));
			var i = folder.getFilesByName(Path.File(path));
			return (i.hasNext()) ? true : false;
		},
		"Get": function(path) {
			if (!Folder.Exists(Path.Directory(path))) {
				return null;
			}
			var folder = Folder.Get(Path.Directory(path));
			var i = folder.getFilesByName(Path.File(path));
			return (i.hasNext()) ? i.next() : null;
		},
		"GetId": function(path) {
			var file = File.Get(path);
			return (file == null) ? null : file.getId();
		},
		"Move": function(path, destination) {
			if (!File.Exists(path)) {
				return false;
			}
			var destination = (Folder.Exists(destination)) ? Folder.Get(destination) : Folder.Create(destination);
			var file = File.Get(path);
			var i = file.getParents();
			while (i.hasNext()) {
				i.next().removeFile(file);
			}
			return destination.addFile(file);
		}
	},
	"Folder": {
		"Create": function(path) {
			if (path == "") {
				return DriveApp.getRootFolder();
			}
			var folders = path.split("/");
			var navigator = DriveApp.getRootFolder();
			for (var j = 0; j < folders.length; j++) {
				var i = navigator.getFoldersByName(folders[j]);
				if (i.hasNext()) {
					navigator = i.next();
				} else {
					navigator = navigator.createFolder(folders[j]);
				}
			}
			return navigator;
		},
		"Delete": function(path) {
			if (path == "") {
				return;
			}
			var folder = Folder.Get(path);
			if (folder == null) {
				return;
			}
			Folder.DeleteFiles(path);
			var i = folder.getFolders();
			while (i.hasNext()) {
				Folder.Delete(path + "/" + i.next().getName());
			}
			folder.setTrashed(true);
		},
		"DeleteFiles": function(path) {
			var folder = Folder.Get(path);
			if (folder == null) {
				return false;
			}
			var i = folder.getFiles();
			while (i.hasNext()) {
				i.next().setTrashed(true);
			}
		},
		"Get": function(path) {
			if (path == "") {
				return DriveApp.getRootFolder();
			}
			var folders = path.split("/");
			var navigator = DriveApp.getRootFolder();
			for (var j = 0; j < folders.length; j++) {
				var i = navigator.getFoldersByName(folders[j]);
				if (i.hasNext()) {
					navigator = i.next();
				} else {
					return null;
				}
			}
			return navigator;
		},
		"GetId": function(path) {
			var folder = Folder.Get(path);
			return (folder == null) ? null : folder.getId();
		},
		"Exists": function(path) {
			if (Folder.Get(path) == null) {
				return false;
			}
			return true;
		},
		"Move": function(path, destination) {
			var folder = Folder.Get(path);
			if (folder == null) {
				return false;
			}
			destination = (Folder.Exists(destination)) ? Folder.Get(destination) : Folder.Create(destination);
			var i = folder.getParents();
			while (i.hasNext()) {
				i.next().removeFolder(folder);
			}
			return destination.addFolder(folder);
		}
	},
	"Path": Path
};
