'use strict';
var debounce = require('lodash.debounce');


// @ngInject
function SourcesController($element, $scope) {
	var self = this;
	var inputs = $element[0].querySelectorAll(".fact-link");
	
	var handleInputChange = debounce(function () {
		$scope.$apply(function () {
			self.onEditSources({ links: getValues() });
		});
	}, 100);

	function getValues() {
		var values = []
		for (var i = 0; i < inputs.length; ++i){
			values.push(inputs[i].value);
		}
		return values;
	}
	for (var i = 0; i < inputs.length; ++i) {
		inputs[i].addEventListener('input', handleInputChange);
	}
}

/**
 * @description Links for facts
 */
module.exports = {
	controller: SourcesController,
	controllerAs: 'vm',
	bindings: {
		sources: "<?",
		onEditSources: "&",
		readOnly: "<"
	},
	template: require('../templates/sources.html'),
};
