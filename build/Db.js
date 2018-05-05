
var srcFolder = "src/Db";
var outputFile = "dist/Fs.js";

//////////////////////////////////////////////////////////////////////////////////
///// Nothing to Edit Below ////////////////////////////////////////////////////
Path = require("path");
Fs = require("fs");
Uglify = require("uglify-js");

var source = Fs.readFileSync(srcFolder+"/Database/index.js", "utf8");
while((matches = source.match(/\/\*\~IncludeFile\(.*\)\~\*\//)) != null) {
	var file = matches[0].replace("/*~IncludeFile(\"", "").replace("\")~*/", "");
	var s = Fs.readFileSync(srcFolder+"/Database/"+file, "utf8");
	source = source.replace(/\/\*\~IncludeFile\(.*\)\~\*\//, s);
}
//source = Uglify.minify(source, {output:{beautify:true}}).code;
Fs.writeFileSync(srcFolder+"/Database.js", source, "utf8");

/*
var matches = source.match(/\/\*\~IncludeFiles\(.*\)\~\*\//);
while (matches != null) {
	console.log(matches);
	matches = null;
}
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
*/
