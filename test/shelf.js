var Shelf = require('../shelf');

describe('shelf', function() {
	it('should know its length', function() {
		expect(new Shelf(3).length, 3);
	});
	it('should know its true length', function() {
		var s = new Shelf(2);
		expect(s.count, 0);
		s.push();
		expect(s.count, 1);
		s.push();
		expect(s.count, 2);
		s.push();
		expect(s.count, 2);
	});
	it('should know its members', function() {
		var s = new Shelf(2);
		s.push(1);
		s.push(2);
		s.push(3);
		expect(s.count, 2);
		expect(s.members[0], 2);
		expect(s.members[1], 3);
	});
	it('should know if it’s full', function() {
		var s = new Shelf(2);
		expect(s.isFull, false);
		s.push(1);
		expect(s.isFull, false);
		s.push(2);
		expect(s.isFull, true);
		s.push(3);
		expect(s.isFull, true);
	});
});

function expect(act, exp) {
	if (act !== exp)
		throw 'Expected ' + exp + ' but got ' + act;
}