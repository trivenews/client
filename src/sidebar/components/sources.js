'use strict';
var debounce = require('lodash.debounce');


// @ngInject
function SourcesController($element, $scope) {
	var self = this;
	var inputs = $element[0].querySelectorAll(".fact-link");
	this.values = [];
	
	var handleInputChange = debounce(function () {
		$scope.$apply(function () {
			self.onEditSources({ sources: getValues() });
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

	this.getHref = function (index) {
		if (!self.values.length || !self.values[index])
			return null;
		if (self.values[index].slice(0, 4) !== "http")
			return "http://" + self.values[index];
		return self.values[index];
	}

	this.getLinkValue = function (data) {
		if (!data)
			return "";
		if (data.slice(0, 8).toLowerCase() == "https://")
			return data.slice(8);
		if (data.slice(0, 7).toLowerCase() == "http://")
			return data.slice(7);
		return data;
	}

	$scope.$watchCollection("vm.data", function (newVal, oldVal) {
		if (!newVal || !newVal.length) {
			inputs[0].value = "";
			inputs[1].value = "";
			inputs[2].value = "";
			self.values[0] = "";
			self.values[1] = "";
			self.values[2] = "";
			return;
		}
		for (var i = 0; i < newVal.length; ++i){
			inputs[i].value = newVal[i];
			self.values[i] = newVal[i];
		}
	})
}

/**
 * @description Links for facts
 */
module.exports = {
	controller: SourcesController,
	controllerAs: 'vm',
	bindings: {
		data: "<?",
		onEditSources: "&",
		readOnly: "<"
	},
	template: require('../templates/sources.html'),
};
