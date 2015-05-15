function Shelf(length) {
	var members = [];
	this.push = function(x) {
		members.push(x);
		if (members.length > length)
			return members.shift();
	};
	Object.defineProperty(this, 'length', { get: function () { return length; } });
	Object.defineProperty(this, 'count', { get: function () { return members.length; } });
	Object.defineProperty(this, 'members', { get: function () { return members.slice(); } });
	Object.defineProperty(this, 'isFull', { get: function () { return members.length == length; } });
}

module.exports = Shelf;