(function() {
	var NS = window.ginpencom = window.ginpencom || {};
	NS.template = function(source, data) {
		var rx = /[a-zA-Z]/;
		var templateText = document.querySelector(source).text
		var result = '';
		var end = 0;

		while (end >= 0) {
			var start = templateText.indexOf('{', end) + 1;
			if (start < 1) {
				break;
			}

			result += templateText.slice(end, start-1);

			end = templateText.indexOf('}', start);
			if (end < 1) {
				break;
			}

			var inner = templateText.slice(start, end);
			var first = inner[0];
			var key = rx.test(first)?inner:inner.slice(1);
			var value = (key in data ? data[key] : '');

			if (first == '$') {
				result += value;
			}
			else {
				result += ('' + value)
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#x27;');
			}

			end = end + 1;
		}

		result += templateText.slice(end);

		return result;

	

	/*
				.replace(/{([?#$:\/]?)(\w+)}/g, function(all, operation, key) {
					var hasData = (key in data);
					var value = '' + (hasData ? data[key] : '');
					if (operation == '$') {
						return value;
					}
					else {
						return value
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;')
							.replace(/'/g, '&#x27;');
					}
				});
				*/
	}
})();