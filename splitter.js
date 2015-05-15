var util = require('./util');

function Splitter(text) {
	var i = 0;
	this.next = function() {
		if (i >= text.length)
			return null;
		var out = '';
		takeWhile(util.isSplitter);
		takeWhile(not(util.isSplitter));
		takeWhile(util.isSplitter);
		return out || null;

		function takeWhile(c) {
			while (i < text.length && c(text[i]))
				out += text[i++];
		}
	};
	this.skip = function(n) {
		while (n--) this.next();
	};
	this.reset = function() {
		i = 0;
	};
	this.all = function() {
		var oldI = i,
			out = [],
			next;
		i = 0;
		while (next = this.next())
			out.push(next);
		i = oldI;
		return out;
	}
}

function not(c) {
	return function(x) {
		return !c(x);
	}
}

module.exports = Splitter;