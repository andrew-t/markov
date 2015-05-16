function Picker() {
	this.totalCount = 0;
	this.members = {};
}
Picker.prototype.push = function(key, weight) {
	if (weight == undefined)
		weight = 1;
	this.totalCount += weight;
	this.members[key] = this.count(key) + weight;
	return this;
};
Picker.prototype.pick = function() {
	var n = Math.random() * this.totalCount;
	for (var key in this.members)
		if (this.members.hasOwnProperty(key) &&
			((n -= this.members[key]) < 0))
				return key;
	throw 'No member found.';
};
Picker.prototype.count = function(key) {
	return this.members[key] || 0;
};
Picker.prototype.inject = function(donor, weight) {
	if (weight == undefined)
		weight = 1;
	for (var key in donor.members)
		if (this.members.hasOwnProperty(key))
			this.push(key, donor.members[key] * weight);
	return this;
};
Picker.prototype.multiply = function(weight) {
	for (var key in this.members)
		if (this.members.hasOwnProperty(key))
			this.members[key] *= weight;
	return this;
};
Picker.prototype.clone = function() {
	var clone = new Picker();
	for (var key in this.members)
		if (this.members.hasOwnProperty(key))
			clone.push(key, this.members[key]);
	return clone;
};

module.exports = Picker;