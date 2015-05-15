var util = require('./util'),
	Split = require('./splitter'),
	Picker = require('./picker'),
	Shelf = require('./shelf'),
	noWord = '!';

function Markov(order) {
	if (!order)
		order = 2;
	var starters = new Picker(),
		chain = {};
	this.train = function(text) {
		var split = new Split(text),
			first = true;
		for (var start = 0; start < order; ++start) {
			var keyShelf = new Shelf(order),
				prevShelf = new Shelf(1);
			split.reset().skip(start).each(function(word) {
				keyShelf.push(word);
				if (first && keyShelf.isFull) {
					first = false;
					starters.push(keyShelf.members.join(''))
				}
				var key = toKey(keyShelf.members);
				chain[key] = new Picker();
				addToPrev(key, word);
			});
			addToPrev();

			function addToPrev(key, word) {
				var prev = prevShelf.push(key);
				if (prev)
					chain[prev].push(word || noWord);
			}
		}
	};

	this.has = function(key) {
		return !!chain[toKey(key)];
	};

	this.iterate = function(key) {
		if (!key)
			key = starters.pick();
		var shelf = new Shelf(order),
			force = [];
		new Split(key).each(function(word) {
			var f = shelf.push(word);
			if (f)
				force.push(f);
		});
		return {
			next: function() {
				if (force.length)
					return force.shift();
				var current = chain[toKey(shelf.members.filter(function(x) {
						return x;
					}))],
					next = shelf.push(current && current.pick());
				return next == noWord ? undefined : next;
			}
		};
	};

	Object.defineProperty(this, 'order', { get: function () { return order; } });
};

Markov.prototype.ramble = function(start, maxLength) {
	var out = '',
		iterator = this.iterate(start);
	if (!maxLength)
		maxLength = Infinity;
	while (--maxLength) {
		var next = iterator.next();
		if (next)
			out += next;
		else break;
	}
	return out;
};

function toKey(words) {
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
		.join(' ');
}

module.exports = Markov;