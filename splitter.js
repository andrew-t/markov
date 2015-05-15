var isLetter = require('./is-letter');

function Splitter(text) {
	var i = 0;
	this.next = function() {
		if (i >= text.length)
			return null;
		var out = '';
		while (!isLetter(text[i]))
			if (++i >= text.length)
				return null;
		while (isLetter(text[i]))
			out += text[i++];
		return out || null;
	};
	this.skip = function(n) {
		while (n--) this.next();
	};
}

module.exports = Splitter;