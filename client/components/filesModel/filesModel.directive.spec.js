'use strict';

describe('Directive: filesModel', function () {

  // load the directive's module
  beforeEach(module('warehouseApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<files-model></files-model>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the filesModel directive');
  }));
});