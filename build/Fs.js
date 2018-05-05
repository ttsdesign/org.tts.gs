
var sources = {
	"File": [
		"src/Fs/File/Create.js",
		"src/Fs/File/Delete.js",
		"src/Fs/File/DeleteAll.js",
		"src/Fs/File/Exists.js",
		"src/Fs/File/Get.js",
		"src/Fs/File/GetId.js",
		"src/Fs/File/Move.js"
	],
	"Folder": [
		"src/Fs/Folder/Create.js",
		"src/Fs/Folder/Delete.js",
		"src/Fs/Folder/DeleteFiles.js",
		"src/Fs/Folder/Exists.js",
		"src/Fs/Folder/Get.js",
		"src/Fs/Folder/GetId.js",
		"src/Fs/Folder/Move.js"
	]
};

var outputFile = "dist/Fs.js";
//////////////////////////////////////////////////////////////////////////////////
///// Nothing to Edit Below ////////////////////////////////////////////////////
Path = require("path");
Fs = require("fs");
Uglify = require("uglify-js");

var code = [];
Object.keys(sources).forEach(function (m) {
	var libCode = [];
	sources[m].forEach(function (f) {
		var source = Fs.readFileSync(f, "utf8");
		var name = source.substring(0, source.indexOf("=")).trim().split(".").pop();
		libCode.push("\""+name+"\": "+source.substr(source.indexOf("=")+1));
	});
	code.push("\""+m+"\": {\r\n"+libCode.join(",\r\n")+"\r\n}");
});

output = "Fs = {\r\n"+code.join(",\r\n")+"\r\n}";
Fs.writeFileSync(outputFile, Uglify.minify(output, {output: {beautify: true}}).code, "utf8");
Fs.writeFileSync(outputFile.replace(/\.js$/, ".min.js"), Uglify.minify(output).code, "utf8");

process.exit(0);
		//code[f.substr(f.lastIndexOf("/")+1)] = Uglify.minify(source, {compress: {keep_fnames:true}, mangle: {keep_fnames:true}});
		//code[f.substr(f.lastIndexOf("/")+1)] = Uglify.minify(source);


var output = "";
Object.keys(code).forEach(function (f) {
	output += "/* "+f+" */\n";
	output += code[f].code + "\n";
});

Fs.writeFileSync(outputFile, output, "utf8");
//Fs.writeFileSync(outputFile.replace(/\.js$/, ".min.js"), Uglify.minify(output, {compress: {keep_fnames:true}, mangle: {keep_fnames:true}}).code, "utf8");
Fs.writeFileSync(outputFile.replace(/\.js$/, ".min.js"), Uglify.minify(output).code, "utf8");


