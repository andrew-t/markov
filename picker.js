function Picker() {
	this.totalCount = 0;
	this.members = {};
}
Picker.prototype.push = function(key) {
	++this.totalCount;
	this.members[key] = this.count(key) + 1;
};
Picker.prototype.pick = function() {
	var i = 0,
		n = Math.random() * this.totalCount;
	for (var key in this.members)
		if ((n -= this.members[key]) < 0)
			return key;
	throw 'No member found.';
};
Picker.prototype.count = function(key) {
	return this.members[key] || 0;
};

module.exports = Picker;