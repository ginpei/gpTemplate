var expectedList = [
	'Ginpei says "Nice boat".',
	'escaped: &lt;b style="color:red" title=\'bold\'&gt;BOLD&lt;/b&gt; / not-escaped: <b style="color:red" title="bold">BOLD</b>',
	'The number "0" is odd, and the number "1" is even.',
	'AB',
	'Ax',
	'xB',
	'xx',
];

var page = require('webpage').create();
page.open('sample/basic.html', function(statusText) {
	window.setTimeout(function() {
		try {
			test();
		}
		catch (err) {
			console.error(err);
		}
		phantom.exit();
	}, 1000);

	function test() {
		var liList = querySelectorAll('li');

		var errored = false;
		for (var i=0, l=liList.length; i<l; i++) {
			var result = liList[i].innerHTML;
			var expected = expectedList[i];
			if (result != expected) {
				errored = true;
				console.error('#', i, '\n-   result: ', result, '\n- expected: ', expected);
			}
		}

		if (!errored) {
			console.log('Passed!');
		}
	}

	function querySelectorAll(selector) {
		var liList = [];

		var length = page.evaluate(function() {
			return document.querySelectorAll('li').length;
		});

		for (var i=0; i<length; i++) {
			var li = page.evaluate(function(i) {
				return document.querySelectorAll('li')[i];
			}, i);
			liList.push(li);
		}

		return liList;
	}
});
