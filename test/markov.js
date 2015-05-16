var Markov = require('../markov'),
	Picker = require('../picker');

describe('Markov', function() {
	it('should default to order 2.', function() {
		expect(new Markov(1).order, 1);
		expect(new Markov().order, 2);
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
		expect(i.next(), 'This');
		expect(i.next(), 'is');
		expect(i.next(), 'a');
		expect(i.next(), 'test.');
		expect(i.next(), undefined);
	});
	it('should handle big numbers.', function() {
		var m = new Markov(1);
		m.train('I am 1,000 years old.');
		demand(m.has('1,000'), 'Missing 1000');
		demand(!m.has('1'), 'Too much 1');
		demand(!m.has('000'), 'Too much 000');
	});
	it('should ramble.', function() {
		var m = new Markov(1);
		m.train('This is a test.');
		expect(m.ramble(), 'This is a test.');
	});
	it('should be fairly balanced.', function() {
		var m = new Markov(2);
		m.train('1 2 3 4');
		m.train('1 2 3 5 6');
		m.train('1 2 3');
		m.train('1 2 3 4');
		var data = new Picker();
		for (var i = 0; i < 1000; ++i)
			data.push(m.ramble());
		console.dir(data.members)
		ish(data.count('1 2 3'), 250, 50);
		ish(data.count('1 2 3 4'), 500, 50);
		ish(data.count('1 2 3 5 6'), 250, 50);
	});
	describe('combinations', function() {
		var m = new Markov(1);
		m.train('1 2');
		var n = new Markov(1);
		n.train('3 4');
		it('should work', function() {
			var x = Markov.combine([{
					chain: m,
					weight: 1
				}, {
					chain: n,
					weight: 2
				}]);
			expect(x.order, 1);
			expect(x.ramble('1'), '1 2');
			expect(x.ramble('3'), '3 4');
		});
		it('should be weighted', function() {
			var x = Markov.combine([{
					chain: m,
					weight: 1000
				}, {
					chain: n,
					weight: 0
				}]);
			for (var i = 0; i < 100; ++i)
				expect(x.ramble(), '1 2');
		});
	});
});

function ish(act, exp, delta) {
	if (act < exp - delta || act > exp + delta)
		throw 'Expected ' + exp + ' ± ' + delta + ' but got ' + act;
}

function demand(tr, msg) {
	if (!tr)
		throw msg || 'Something is wrong.';
}

function expect(act, exp) {
	if (act !== exp)
		throw 'Expected ' + exp + ' but got ' + act;
}