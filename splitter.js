var util = require('./util');

function Splitter(text) {
	var i = 0;
	this.next = function() {
		if (i >= text.length)
			return null;
		var out = '';
		while (!util.isSplitter(text[i]))
			out += text[i++];
		while (util.isSplitter(text[i])) {
			out += text[i++];
			if (i >= text.length)
				break;
		}
		return out || null;
	};
	this.skip = function(n) {
		while (n--) this.next();
	};
}

module.exports = Splitter;