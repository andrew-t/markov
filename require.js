var preload = (function(){
	var src = {},
		modules = {},
		docLoaded = false,
		runs = [];

	document.addEventListener('DOMContentLoaded', function() {
		docLoaded = true;
		runs.forEach(function(run) {
			run();
		});
	});

	return function preload(deps, callback) {
		runs.push(run);
		var loaded = 0;
		deps.forEach(function(dep, i) {
			var oReq = new XMLHttpRequest();
			oReq.onload = function() {
				src[dep] = this.responseText;
				++loaded;
				run();
			};
			oReq.open("get", dep + ".js", true);
			oReq.send();
		});

		function run() {
			if (docLoaded && loaded == deps.length) {
				window.require = function require(path) {
					if (modules[path])
						return modules[path];
					if (!src[path])
						throw 'Did not preload ' + path;
					var module = {};
					eval("!function(){" + src[path] + "}();");
					return modules[path] = module.exports;
				};
				callback.apply(this, deps);
			}
		}
	}
})();