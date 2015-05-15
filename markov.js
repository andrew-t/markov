var util = require('./util'),
	Split = require('./splitter');

function Markov(order) {
	if (!order)
		order = 2;
	var starters = [],
		chain = {};
	this.train = function(text) {
		for (var start = 0; start < order; ++start)
			for (var i = start; i < words.length; ++words) {
				
			}
	};

	Object.defineProperty(this, 'order', { get: function () { return order } });
};

Markov.toKey = function toKey(words) {
	return (words instanceof Array
			? words
			: new Split(words).all())
		.map(function(word) {
			return word
				.toLowerCase()
				.trim()
				.split('')
				.filter(function(c) {
					return !util.isSplitter(c);
				})
				.map(function(c) {
					return util.isLetter(c) ? c : '-';
				})
				.join('');
		})
		.join('');
}

module.exports = Markov;