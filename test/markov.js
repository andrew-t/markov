var Markov = require('../markov');

describe('Markov', function() {
	it('should default to order 2.', function() {
		expect(new Markov(1).order, 1);
		expect(new Markov().order, 2);
	});
	it('should create keys.', function() {
		expect(Markov.toKey('Test '), 'test');
		expect(Markov.toKey('Andrew’s'), 'andrew-s');
		expect(Markov.toKey('Andrew’s test!'), 'andrew-s test');
	});
	it('should learn phrases exist.', function() {
		var m = new Markov(2);
		m.train('This is a test.');
		demand(m.has('This is'));
		demand(m.has('is a'));
		demand(m.has('a test.'));
	});
	it('should start to iterate.', function() {
		var m = new Markov(2);
		m.train('This is a test.');
		var i = m.iterate();
		expect(i.next(), 'This ');
		expect(i.next(), 'is ');
		expect(i.next(), 'a ');
		expect(i.next(), 'test.');
		expect(i.next(), undefined);
	});
});

function demand(tr, msg) {
	if (!tr)
		throw msg || 'Something is wrong.';
}

function expect(act, exp) {
	if (act !== exp)
		throw 'Expected ' + exp + ' but got ' + act;
}