var util = require('./util');

function Splitter(text) {
	var i = 0;
	this.next = function() {
		if (i >= text.length)
			return null;
		var out = '',
			isNumber;
		takeWhile(util.isSplitter);
		takeWhile(function(x) {
			if (isNumber && /[.,]/.test(x))
				return true;
			if (isNumber == undefined && !/[$£€]/.test(x))
				isNumber = /\d/.test(x);
			return !util.isSplitter(x);
		});
		takeWhile(util.isSplitter);
		return out || null;

		function takeWhile(c) {
			while (i < text.length && c(text[i]))
				out += text[i++];
		}
	};
	this.skip = function(n) {
		while (n--) this.next();
		return this;
	};
	this.reset = function() {
		i = 0;
		return this;
	};
	this.all = function() {
		var all = [],
			oldI = i;
		i = 0;
		this.each(function(next) {
			all.push(next);
		});
		i = oldI;
		return all;
	};
	this.each = function(c) {
		var next,
			n = 0;
		while (next = this.next())
			c(next, n++);
	};
}

module.exports = Splitter;