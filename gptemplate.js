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
		var conditionalsStack = [];
		var curCondition = true;

		for (var i=0, l=parts.length; i<l; i++) {
			var item = parts[i];

			// plain text
			if (curCondition && typeof item === 'string') {
				result += item;
			}

			// operators
			else {
				var op = item[0];
				var key = item[1];
				var value = (key in data ? data[key] : '');

				// conditional
				if (op == '?') {
					conditionalsStack.push(curCondition);
					if (curCondition) {
						curCondition = !!value;
					}
				}
				// reverse conditional
				else if (op == ':') {
					if (conditionalsStack[conditionalsStack.length-1]) {
						curCondition = !curCondition;
					}
				}
				// end of conditional
				else if (op == '/') {
					curCondition = conditionalsStack.pop();
				}
				// other (value)
				else if (curCondition) {
					if (op == '$') {
						result += value;
					}
					else {
						result += (''+value)
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;')
							.replace(/'/g, '&#x27;');
					}
				}
			}
		}

		return result;
	};
})();
