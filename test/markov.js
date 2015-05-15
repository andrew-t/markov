var Markov = require('../markov');

describe('Markov', function() {
	it('should default to order 2.', function() {
		expect(new Markov(1).order, 1);
		expect(new Markov().order, 2);
	});
	it('should create keys.', function() {
		expect(Markov.toKey('Test '), 'test');
		expect(Markov.toKey('Andrew’s'), 'andrew-s');
	});
});

function expect(act, exp) {
	if (act !== exp)
		throw 'Expected ' + exp + ' but got ' + act;
}