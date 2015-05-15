var deck = require('deck');

function Picker() {
	this.members = {};
}
Picker.prototype.push = function(key) {
	this.members[key] = (this.members[key] || 0) + 1;
};
Picker.prototype.pick = function() {
	return deck.pick(this.members);
};

module.exports = Picker;