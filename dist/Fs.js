Fs = {
    File: {
        Create: function(e, t) {
            var r = Fs.Folder.Exists(Path.Directory(e)) ? Fs.Folder.Get(Path.Directory(e)) : Fs.Folder.Create(Path.Directory(e));
            return "object" == typeof t ? t.setName(Path.File(e)) : t = Utilities.newBlob(t).setName(Path.File(e)), 
            r.createFile(t);
        },
        Delete: function(e) {
            var t = Fs.File.Get(e);
            return null != t && t.setTrashed(!0);
        },
        DeleteAll: function(e) {
            for (var t = Fs.File.Get(e); null != t; ) Fs.File.Delete(t), t = Fs.File.Get(e);
        },
        Exists: function(e) {
            return !!Fs.Folder.Exists(Path.Directory(e)) && !!Fs.Folder.Get(Path.Directory(e)).getFilesByName(Path.File(e)).hasNext();
        },
        Get: function(e) {
            if (!Fs.Folder.Exists(Path.Directory(e))) return null;
            var t = Fs.Folder.Get(Path.Directory(e)).getFilesByName(Path.File(e));
            return t.hasNext() ? t.next() : null;
        },
        GetId: function(e) {
            var t = Fs.File.Get(e);
            return null == t ? null : t.getId();
        },
        Move: function(e, t) {
            if (!Fs.File.Exists(e)) return !1;
            t = Fs.Folder.Exists(t) ? Fs.Folder.Get(t) : Fs.Folder.Create(t);
            for (var r = Fs.File.Get(e), l = r.getParents(); l.hasNext(); ) l.next().removeFile(r);
            return t.addFile(r);
        }
    },
    Folder: {
        Create: function(e) {
            if ("" == e) return DriveApp.getRootFolder();
            for (var t = e.split("/"), r = DriveApp.getRootFolder(), l = 0; l < t.length; l++) {
                var F = r.getFoldersByName(t[l]);
                r = F.hasNext() ? F.next() : r.createFolder(t[l]);
            }
            return r;
        },
        Delete: function(e) {
            if ("" != e) {
                var t = Fs.Folder.Get(e);
                if (null != t) {
                    Fs.Folder.DeleteFiles(e);
                    for (var r = t.getFolders(); r.hasNext(); ) Fs.Folder.Delete(e + "/" + r.next().getName());
                    t.setTrashed(!0);
                }
            }
        },
        DeleteFiles: function(e) {
            var t = Fs.Folder.Get(e);
            if (null == t) return !1;
            for (var r = t.getFiles(); r.hasNext(); ) r.next().setTrashed(!0);
        },
        Exists: function(e) {
            return null != Fs.Folder.Get(e);
        },
        Get: function(e) {
            if ("" == e) return DriveApp.getRootFolder();
            for (var t = e.split("/"), r = DriveApp.getRootFolder(), l = 0; l < t.length; l++) {
                var F = r.getFoldersByName(t[l]);
                if (!F.hasNext()) return null;
                r = F.next();
            }
            return r;
        },
        GetId: function(e) {
            var t = Fs.Folder.Get(e);
            return null == t ? null : t.getId();
        },
        Move: function(e, t) {
            var r = Fs.Folder.Get(e);
            if (null == r) return !1;
            t = Fs.Folder.Exists(t) ? Fs.Folder.Get(t) : Fs.Folder.Create(t);
            for (var l = r.getParents(); l.hasNext(); ) l.next().removeFolder(r);
            return t.addFolder(r);
        }
    }
};