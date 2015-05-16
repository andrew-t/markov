preload(['./markov', './picker', './shelf', './util', './splitter'], function() {
	var Markov = require('./markov'),
		order,
		chains = [],
		$ = document.getElementById.bind(document);

	$('define').addEventListener('click', function() {
		order = $('order').value;
		$('1').classList.add('hidden');
		$('2').classList.remove('hidden');
		$('corpus').focus();
		$('output').value = '';
	});

	$('train').addEventListener('click', function() {
		var m = {
			chain: new Markov(order),
			weight: 1
		};
		chains.push(m);
		$('corpus').value
			.split(new RegExp($('split').value, 'g'))
			.filter(function(x) { return x.trim(); })
			.forEach(m.chain.train.bind(m.chain));
		$('corpus').value = '';
		$('3').classList.remove('hidden');
		$('4').classList.remove('hidden');
		m.starters = m.chain.starters;
		m.links = m.chain.chain;
		list();
	});

	$('ramble').addEventListener('click', ramble);
	$('reramble').addEventListener('click', function() {
		$('output').value = '';
		ramble();
	});
	function ramble() {
		$('output').value = Markov.combine(chains).ramble(
			$('output').value || undefined,
			$('forever').checked
				? undefined
				: $('length').value);
	}

	$('forever').addEventListener('change', ldiv);
	ldiv();
	function ldiv() {
		$('ldiv').classList[ $('forever').checked ? 'add' : 'remove' ]('hidden');
	}

	$('reset').addEventListener('click', function() {
		chains = [];
		$('1').classList.remove('hidden');
		$('2').classList.add('hidden');
		$('3').classList.add('hidden');
		$('4').classList.add('hidden');
	});

	function list() {
		console.log(chains)
		$('chains').innerHTML = '';
		chains.forEach(tr);
	}

	function tr(markov, i) {
		var id = 'chain-' + i,
			tr = $(id),
			total = 0;
		for (var key in markov.links)
			if (!markov.links[key].totalCount++)
				console.log(key)
			//total += markov.links[key].totalCount;
		if (!tr) {
			var tr = el($('chains'), 'tr', null, { id: id })
			el(tr, 'td', markov.chain.ramble(null, Math.max(8, order)));
			el(tr, 'td', markov.starters.totalCount);
			el(tr, 'td', total);
			el(el(tr, 'td'), 'input', null, {
				type: 'number',
				value: markov.weight,
				id: id + '-w'
			}).addEventListener('change', function() {
				markov.weight = $(id + '-w').value;
				list();
			});
			el(tr, 'td', null, { id: id + '-ws' });
			el(tr, 'td', null, { id: id + '-wc' });
		}
		$(id + '-ws').innerHTML = markov.starters.totalCount * markov.weight
		$(id + '-wc').innerHTML = total * markov.weight
		return tr;
	}

	function el(parent, tag, text, attr) {
		var el = document.createElement(tag);
		parent.appendChild(el);
		if (text)
			el.appendChild(document.createTextNode(text));
		if (attr)
			for (var key in attr)
				el.setAttribute(key, attr[key]);
		return el;
	}
});