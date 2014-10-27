'use strict';

describe('Directive: taskCreator', function () {

  // load the directive's module
  beforeEach(module('sonataskApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<task-creator></task-creator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the taskCreator directive');
  }));
});
