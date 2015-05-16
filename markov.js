var util = require('./util'),
	Split = require('./splitter'),
	Picker = require('./picker'),
	Shelf = require('./shelf'),
	noWord = '!';

function Markov(order, starters, chain) {
	if (!order)
		order = 2;
	var starters = new Picker(),
		chain = {};
	this.train = function(text) {
		var split = new Split(text),
			first = true,
			keyShelf = new Shelf(order),
			prevShelf = new Shelf(1);
		split.reset().each(function(word) {
			keyShelf.push(word);
			if (first && keyShelf.isFull) {
				first = false;
				starters.push(keyShelf.members
					.map(function(x) { return x.trim(); })
					.join(' '))
			}
			var key = toKey(keyShelf.members);
			if (!chain[key])
				chain[key] = new Picker();
			addToPrev(key, word);
		});
		addToPrev();
		return this;

		function addToPrev(key, word) {
			var prev = prevShelf.push(key);
			if (prev)
				chain[prev].push(word ? word.trim() : noWord);
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
			var f = shelf.push(word.trim());
			if (f)
				force.push(f.trim());
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
	Object.defineProperty(this, 'starters', {
		get: function () {
			return starters.clone();
		}
	});
	Object.defineProperty(this, 'chain', {
		get: function () {
			var clone = {};
			for (var key in chain)
				clone[key] = chain[key].clone();
			return clone;
		}
	});

	this.inject = function(donor, weight) {
		starters.inject(donor.starters, weight);
		var c = donor.chain;
		for (var key in c)
			if (chain[key])
				chain[key].inject(c[key], weight);
			else
				chain[key] = c[key].multiply(weight);
	};
};

Markov.prototype.ramble = function(start, maxLength) {
	var out = '',
		iterator = this.iterate(start);
	if (!maxLength)
		maxLength = Infinity;
	while (--maxLength) {
		var next = iterator.next();
		if (next) {
			out += next;
			if (!/\s["'“‘({\[]$/.test(out))
				out += ' ';
		} else break;
	}
	return out.trim();
};

Markov.combine = function(els) {
	var m = new Markov(els[0].chain.order);
	els.forEach(function(el) {
		m.inject(el.chain, el.weight);
	});
	return m;
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
					return util.isLetter(c) ? c : ' ';
				})
				.join('')
				.trim()
				.replace(/\s/, '-');
		})
		.join(' ');
}

module.exports = Markov;