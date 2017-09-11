'use strict';

module.exports = {
  controllerAs: 'vm',
  //@ngInject
  controller: function (settings) {
    this.isThemeClean = settings.theme === 'clean' ? true : false;
  },
  bindings: {
    auth: '<',
    isSidebar: '<',
    onShowHelpPanel: '&',
    onLogin: '&',
    onLogout: '&',
    onSharePage: '&',
    onSignUp: '&',
    searchController: '<',
    sortKey: '<',
    sortKeysAvailable: '<',
    onChangeSortKey: '&',
    pendingUpdateCount: '<',
    onApplyPendingUpdates: '&',
  },
  template: require('../templates/top-bar.html'),
};
