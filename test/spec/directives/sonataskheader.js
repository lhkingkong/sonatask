'use strict';

describe('Directive: sonataskHeader', function () {

  // load the directive's module
  beforeEach(module('sonataskApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sonatask-header></sonatask-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sonataskHeader directive');
  }));
});
