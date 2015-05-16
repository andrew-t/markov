# markov
It was high time I wrote my own Markov chain implementation, so here it is. It's designed for use in [@fishexist](https://github.com/andrew-t/fish) but Markov chains are great fun, so doubtless I'll use it again.

## Playing

If you just want to play with Markov chains, go to [the web UI](http://github.andrewt.net/markov).

1. Pick an order — a small number will result in a less coherent ramble, but a large number might just output exactly the training text, so find a balance.
2. Enter some training text, and press train. You can enter as much at a time as you like, and as many lines as you like.
3. Optionally enter some text for the ramble to start with. At least the last few words of this text must appear in the training text or else the ramble will be unable to start.
4. Choose a maximum length (or for the ramble to go on 'forever' which really just means until it reaches a natural stopping point).
5. Press 'ramble' and see what you get.
6. Delete the ramble before generating a new one, or else the new one will 'start with' the old one and probably not contain anything else.

## Coding

Here is the usage mixed in with a brief explanation of how to use it:

    var Markov = require('./markov'),
        m = new Markov(2);

We now have a Markov chain of order 2, but not one that does anything.

    m.train('This is my example sentence.');
    m.train('This is another example sentence, which is longer.');
    m.train('This sentence is longer still.');

Now the Markov chain knows what some basic sentences look like, we can ask it to generate one for us:

    var i = m.iterate();
    console.log(i.next());
    console.log(i.next());

`i.next()` returns a single word.

Because the chain is of order 2, it needs two words before it can really get going. To start with, then, it picks a phrase it knows comes at the start of sentences. In this case, there's a two-thirds chance it will pick 'This is' and a one-third chance it will pick 'This sentence' — because those are the proportions it knows exist in its training set.

Let's say it picked "this is".

    console.log(i.next());

The phrase "this is" appears twice in the training set — so it might pick 'my' or 'another' next. Could go either way.

    console.log(i.next());

Now the last two words are (let's say) "is my". The next word must be "example".

    console.log(i.next());

Now the last two words are "my example". The next word must be "sentence".

    console.log(i.next());

Now the last two words are "example sentence". It could end here (based on the first sentence it saw) or add "which" (based on the second). If it adds "which" then it must add "is" next, because "sentence which" only appears once, and similarly it must then add "longer". "Is longer", however, appears twice, so it could stop, or add "still" and then stop. When it stops, `i.next()` returns falsy.

You may have noticed it doesn't care about punctuation when deciding what to do next, although it will output whatever punctuation was in the original text.

Rather than repeatedly iterate through `m.iterate().next()`, you can simply call `m.ramble()` and it will generate a whole passage. Both `iterate` and `ramble` can take a starting off point:

    console.log(m.ramble('This is my'));

`ramble` also takes a maximum length, just in case things get out of hand. (I have trained one of these on a while book before and it does tend to go on a bit.)

## NOTE’S F0R PEDANT‘S

The starting-off process has nothing to do with Markov chains, and a classical Markov chain must be of order 1.

