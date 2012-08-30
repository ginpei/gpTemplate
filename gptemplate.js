(function() {
	var NS = window.ginpencom = window.ginpencom || {};
	NS.template = function(source, data) {
			return document.querySelector(source).text
				.replace(/{([?#$]?)(\w+)}/g, function(all, operation, key) {
					var hasData = (key in data);
					var value = (hasData ? data[key] : '');
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
	}
})();
