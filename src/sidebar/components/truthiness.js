'use strict';
var debounce = require('lodash.debounce');
var GaugeLib = require("../util/gauge.js");
var noUiSlider = require("../lib/no-ui-slider/nouislider.js");
var Gauge = GaugeLib.Gauge;

// @ngInject
function TruthinessController($element, $scope) {
	var vm = this;
	// var input = $element[0].querySelector(".truthiness-input");
	vm.currentValue = 0;

	var gaugeOptions = {
		angle: 0, // The span of the gauge arc
		lineWidth: 0.4, // The line thickness
		radiusScale: .7, // Relative radius
		pointer: {
			length: 0.6, // // Relative to gauge radius
			strokeWidth: 0.035, // The thickness
			color: '#000000' // Fill color
		},
		// percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
		limitMax: true,     // If false, max value increases automatically if value > maxValue
		limitMin: true,     // If true, the min value of the gauge will be fixed
		// colorStart: '#6FADCF',   // Colors
		// colorStop: '#59C5DA',    // just experiment with them
		strokeColor: '#E0E0E0',  // to see which ones work best for you
		staticZones: [
			{ strokeStyle: "#F03E3E", min: -100, max: -50 }, // Red from 100 to 130
			{ strokeStyle: "#ff920b", min: -50, max: 0 }, // Orange
			{ strokeStyle: "#FFDD00", min: 0, max: 50 }, // Yellow
			{ strokeStyle: "#34d60b", min: 50, max: 100 }, // Green
		],
		generateGradient: true,
		highDpiSupport: true     // High resolution support
	};
	var target = $element[0].querySelector(".gauge-canvas"); // your canvas element
	var gauge = new Gauge(target).setOptions(gaugeOptions); // create sexy gauge!
	gauge.minValue = -100;
	gauge.maxValue = 100; // set max gauge value
	gauge.set(0);
	gauge.animationSpeed = 32; // set animation speed (32 is default value)

	var slider = $element[0].querySelector(".slider");
	noUiSlider.create(slider, {
		step: 1,
		start: 0,
		range: {
			min: -100,
			max:100
		},
	})


	var handleInputChange = debounce(function () {
		$scope.$applyAsync(function () {
			vm.onEditTruthiness({ truthiness: vm.currentValue });
		});
	}, 100);
	// input.addEventListener('input', handleInputChange);
	slider.noUiSlider.on('update', function (values) {
		$scope.$applyAsync(function () {
			vm.currentValue = values[0];
			gauge.set(vm.currentValue); // set actual value
		})
		handleInputChange();
	});


	$scope.$watch("vm.data", function (newVal, oldVal) {
		// input.value = parseInt(newVal) || 0;
		vm.currentValue = parseInt(newVal) || 0;
		gauge.set(vm.currentValue);
		slider.noUiSlider.set(vm.currentValue);
	});

	vm.getTruthText = function () {
		if (vm.currentValue < gaugeOptions.staticZones[0].max) {
			return "BLATANT LIE!";
		} else if (vm.currentValue < gaugeOptions.staticZones[1].max) {
			return "Probably False";
		} else if (vm.currentValue < gaugeOptions.staticZones[2].max) {
			return "Maybe";
		} else {
			return "Probably True";
		}
	}
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
