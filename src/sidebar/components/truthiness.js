'use strict';
var debounce = require('lodash.debounce');


// @ngInject
function TruthinessController($element, $scope) {
	var self = this;
	var input = $element[0].querySelector(".truthiness-input");

	var handleInputChange = debounce(function () {
		$scope.$apply(function () {
			console.log('cahnge', input.value);
			var value = parseInt(input.value);
			console.log("value is ", value);
			if (isNaN(value)) {
				console.log("value is not a number");
				value = 0;
			}
			self.onEditTruthiness({ truthiness: value });
		});
	}, 100);
	input.addEventListener('input', handleInputChange);

	$scope.$watch("vm.data", function (newVal, oldVal) {
		input.value = parseInt(newVal);
	})
}

/**
 * @description Links for facts
 */
module.exports = {
	controller: TruthinessController,
	controllerAs: 'vm',
	bindings: {
		data: "<?",
		onEditTruthiness: "&",
		readOnly: "<"
	},
	template: require('../templates/truthiness.html'),
};
