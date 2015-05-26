describe('Search:', function () {

  // Initialization of the AngularJS application before each test case
  beforeEach(module('ngApp.search', 'cgNotify', 'ngProgressLite', 'lz-string',
                    "core.filters"));

  beforeEach(module(function ($provide) {
      $provide.value('RestFullResponse', {});
  }));

  describe('Controller:', function () {
    it('should have participants', inject(function ($rootScope, $controller) {
      var scope = $rootScope.$new();
      var wc = $controller('SearchController', {$scope: scope, data: {tab: "participants"}});
    }));
    it('should have files', inject(function ($rootScope, $controller) {
      var scope = $rootScope.$new();
      var wc = $controller('SearchController', {$scope: scope, data: {tab: "files"}});
    }));
  });
});
