(function() {
	var NS = window.ginpencom = window.ginpencom || {};
	NS.template = function(source, data) {
		var templateText = document.querySelector(source).text;

		// split
		var parts = [];
		var lastPos = 0;
		templateText.replace(/\{([$?:\/])?(\w+)\}/g, function(all, op, key, pos) {
			parts.push(templateText.slice(lastPos, pos));
			parts.push([op, key]);
			lastPos = pos + (op ? 1 : 0) + key.length + 2;
		});
		parts.push(templateText.slice(lastPos));

		// build
		var result = '';
		var condition;
		for (var i=0, l=parts.length; i<l; i++) {
			var item = parts[i];
			if (typeof item === 'string') {
				result += item;
			}
			else {
				var op = item[0];
				var key = item[1];
				var value = (key in data ? ''+data[key] : '');

				if (op == '$') {
					result += value;
				}
				// TODO
				else if (op == '?') {
					condition = !!value;
				}
				else if (op == ':') {
				}
				else if (op == '/') {
				}
				else {
					result += value
						.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/"/g, '&quot;')
						.replace(/'/g, '&#x27;');
				}
			}
		}

		return result;
	};

	/*
	var old = 0&&function () {
		var rx = /[a-zA-Z]/;
		var templateText = document.querySelector(source).text;
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
			else if (first == '?') {
				// TODO: nesting like `{?cond}{?cond}{/cond}{/cond}`
				var then = templateText.indexOf('{:else}', end+1);
				var endif = templateText.indexOf('{/' + key + '}', end+1);
				var keyLength = key.length;
				if (!!value ^ then >= 0) {
					result += templateText.slice(start+2+keyLength, then);
				}
				else {
					result += templateText.slice(then+7, endif);
				}
				end = endif + keyLength + 2;
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
	};
	*/
})();
