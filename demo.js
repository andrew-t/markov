preload(['./markov', './picker', './shelf', './util', './splitter'], function() {
	var Markov = require('./markov'),
		m,
		$ = document.getElementById.bind(document);

	$('define').addEventListener('click', function() {
		m = new Markov($('order').value);
		$('1').classList.add('hidden');
		$('2').classList.remove('hidden');
		$('corpus').focus();
		$('output').value = '';
	});

	$('train').addEventListener('click', function() {
		m.train($('corpus').value);
		$('corpus').value = '';
		$('3').classList.remove('hidden');
	});

	$('ramble').addEventListener('click', function() {
		$('output').value = m.ramble(
			$('output').value || undefined,
			$('forever').checked
				? undefined
				: $('length').value);
	});

	$('forever').addEventListener('change', ldiv);
	ldiv();
	function ldiv() {
		$('ldiv').classList[ $('forever').checked ? 'add' : 'remove' ]('hidden');
	}

	$('reset').addEventListener('click', function() {
		$('1').classList.remove('hidden');
		$('2').classList.add('hidden');
		$('3').classList.add('hidden');
	});
});