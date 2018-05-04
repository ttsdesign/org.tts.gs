
var libs = {
	"Core.js": "libs/org.tts.js.core.min.js"
};

var sources = {
	"Fs.js": [
		"src/Fs/index.js",
		"src/Fs/File.js",
		"src/Fs/Folder.js",
		"src/Fs/Path.js"
	]
};

var outputFile = "dist/Fs.js";
//////////////////////////////////////////////////////////////////////////////////
///// Nothing to Edit Below ////////////////////////////////////////////////////
Path = require("path");
Fs = require("fs");
Uglify = require("uglify-js");

//Object.keys(libs).forEach(function (f) {
//	var source = Fs.readFileSync(libs[f], "utf8");
//	Fs.writeFileSync("dist/"+f, source, "utf8");
//});

var code = {};
Object.keys(sources).forEach(function (m) {
	sources[m].forEach(function (f) {
		var source = Fs.readFileSync(f, "utf8");
		code[f.substr(f.lastIndexOf("/")+1)] = Uglify.minify(source, {compress: {keep_fnames:true}, mangle: {keep_fnames:true}});
	});
});


var output = "";
Object.keys(code).forEach(function (f) {
	output += "/* "+f+" */\n";
	output += code[f].code + "\n";
});

Fs.writeFileSync(outputFile, output, "utf8");
Fs.writeFileSync(outputFile.replace(/\.js$/, ".min.js"), Uglify.minify(output, {compress: {keep_fnames:true}, mangle: {keep_fnames:true}}).code, "utf8");


