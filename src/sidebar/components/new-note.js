'use strict';

var events = require('../events');
var uiConstants = require('../ui-constants');

module.exports = {
  controllerAs: 'vm',
  //@ngInject
  controller: function ($rootScope, annotationUI) {
    this.onNewNoteClick = function(){
      var topLevelFrame = annotationUI.frames().find(f=>!f.id);
      var annot = {};

      annot['target']= [],
      annot['uri'] = topLevelFrame.uri;
      $rootScope.$broadcast(events.BEFORE_ANNOTATION_CREATED, annot);
    };
  },
  bindings: {
  },
  template: require('../templates/new-note.html'),
};
