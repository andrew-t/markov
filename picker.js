var deck = require('deck');

function Picker() {
	this.members = {};
}
Picker.prototype.push = function(key) {
	this.members[key] = this.count(key) + 1;
};
Picker.prototype.pick = function() {
	return deck.pick(this.members);
};
Picker.prototype.count = function(key) {
	return this.members[key] || 0;
};

module.exports = Picker;