Fs.File = {
  'Create': function (path, data) { var folder = (Folder.Exists(Path.Directory(path))) ? Folder.Get(Path.Directory(path)) : Folder.Create(Path.Directory(path)); if (typeof(data) === 'object') { data.setName(Path.File(path)); } else { data = Utilities.newBlob(data).setName(Path.File(path)); } return folder.createFile(data); },
  'Delete': function (path) { var file = File.Get(path); if (file == null) { return false; } return file.setTrashed(true); },
  'DeleteAll': function (path) { var file = File.Get(path); while (file != null) { File.Delete(file); file = File.Get(path); } },
  'Exists': function (path) { if (!Folder.Exists(Path.Directory(path))) { return false; } var folder = Folder.Get(Path.Directory(path)); var i = folder.getFilesByName(Path.File(path)); return (i.hasNext()) ? true : false; },
  'Get': function (path) { if (!Folder.Exists(Path.Directory(path))) { return null; } var folder = Folder.Get(Path.Directory(path)); var i = folder.getFilesByName(Path.File(path)); return (i.hasNext()) ? i.next() : null; },
  'GetId': function (path) { var file = File.Get(path); return (file == null) ? null : file.getId(); },
  'Move': function (path, destination) { if (!File.Exists(path)) { return false; } var destination = (Folder.Exists(destination)) ? Folder.Get(destination) : Folder.Create(destination); var file = File.Get(path); var i = file.getParents(); while(i.hasNext()) { i.next().removeFile(file); } return destination.addFile(file); }
};