'use strict';

var angular = require('angular');

var util = require('../../directive/test/util');

describe.only('newNote', function () {
  before(function () {
    angular.module('app', [])
      .component('selectionTabs', require('../selection-tabs'))
      .component('newNote', require('../new-note'));
  });

  beforeEach(function () {
    var fakeAnnotationUI = {};
    var fakeFeatures = {
      flagEnabled: sinon.stub().returns(true),
    };

    angular.mock.module('app', {
      annotationUI: fakeAnnotationUI,
      features: fakeFeatures,
    });
  });

  it('should display the editor when clicked', function () {
    var elem = util.createDirective(document, 'selectionTabs', {
      selectedTab: 'note',
      totalAnnotations: '123',
      totalNotes: '456',
    });
  });

  it('should display the new note button when the notes tab is active', function () {
    var elem = util.createDirective(document, 'selectionTabs', {
      selectedTab: 'note',
      totalAnnotations: '123',
      totalNotes: '456',
    });
    var newNoteBtn = elem[0].querySelectorAll('button');
    assert.equal(newNoteBtn.length, 1);
  });

  it('should not display the new new note button when the annotations tab is active', function () {
    var elem = util.createDirective(document, 'selectionTabs', {
      selectedTab: 'annotation',
      totalAnnotations: '123',
      totalNotes: '456',
    });

    var newNoteBtn = elem[0].querySelectorAll('button');
    assert.equal(newNoteBtn.length, 0);
  });
});
