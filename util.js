var util = module.exports = {
	isLetter: function isLetter(c) {
		if (!c)
			return false;
		if (c.length > 1)
			throw 'You should only pass one character.'
		return !!c.trim();
	},
	isSplitter: function isSplitter(c) {
		return !util.isLetter(c) && !/['’\-‐]/.test(c)
	}
};