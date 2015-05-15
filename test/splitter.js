var Split = require('../splitter');

describe('Splitter', function() {
	it('should split', function() {
		var s = new Split('This is a test-bed’s example.');
		expect(s.next(), 'This ');
		expect(s.next(), 'is ');
		expect(s.next(), 'a ');
		expect(s.next(), 'test-bed’s ');
		expect(s.next(), 'example.');
		expect(s.next(), null);
		expect(s.next(), null);
		expect(s.next(), null);
	});
	it('should accept quotes', function() {
		var s = new Split('"This" is a test.');
		expect(s.next(), '"This" ');
		expect(s.next(), 'is ');
		expect(s.next(), 'a ');
		expect(s.next(), 'test.');
		expect(s.next(), null);
		expect(s.next(), null);
		expect(s.next(), null);
	});
	it('should accept bare ends', function() {
		var s = new Split('aaa');
		expect(s.next(), 'aaa');
		expect(s.next(), null);
		expect(s.next(), null);
		expect(s.next(), null);
	});
	it('should skip', function() {
		var s = new Split('Hello, world.');
		s.skip(1);
		expect(s.next(), 'world.');
	});
	it('should reset', function() {
		var s = new Split('What is this?');
		expect(s.next(), 'What ');
		s.reset();
		expect(s.next(), 'What ');
	});
	it('should return the whole thing', function() {
		var s = new Split('What is this?');
		expect(s.next(), 'What ');
		var all = s.all();
		expect(all.length, 3);
		expect(all[0], 'What ');
		expect(all[1], 'is ');
		expect(all[2], 'this?');
		expect(s.next(), 'is ');
	});
	it('should iterate', function() {
		var t = 'I like testing!',
			s = new Split(t),
			all = '';
		s.each(function(x) {
			all += x;
		});
		expect(all, t);
	});
});

function expect(act, exp) {
	if (act !== exp)
		throw 'Expected ' + exp + ' but got ' + act;
}