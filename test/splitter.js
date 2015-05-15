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
});

function expect(act, exp) {
	if (act !== exp)
		throw 'Expected ' + exp + ' but got ' + act;
}