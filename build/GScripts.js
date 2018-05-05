var libs = {
	"Fs.js": [
		"src/Fs.js"
	]
};

//////////////////////////////////////////////////////////////////////////////////
///// Nothing to Edit Below ////////////////////////////////////////////////////
Path = require("path");
Fs = require("fs");
Uglify = require("uglify-js");

Object.keys(libs).forEach(function (l) {
	var source = "";
	libs[l].forEach(function (f) {
		source += Fs.readFileSync(f, "utf8") + "\n";
	});
	var code = Uglify.minify(source, {compress: {keep_fnames:true}, mangle: {keep_fnames:true}});
	Fs.writeFileSync("dist/"+l, code.code, "utf8");
});
