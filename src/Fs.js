Fs = {
	File: {
		Create(path, data)
		Delete(path)
		DeleteAll(path) 
		Exists(path)
		Get(path)
		GetId(path)
		Move(path, destination) 
	},
	Folder: {
		Create(path)
		Delete(path) 
		DeleteFiles(path)
		Get(path)
		GetId(path) 
		Exists(path)
		Move(path, destination)
	}
}
	