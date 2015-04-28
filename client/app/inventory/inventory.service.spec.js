'use strict';

describe('Service: inventory', function () {

  // load the service's module
  beforeEach(module('warehouseApp'));

  // instantiate service
  var inventory;
  beforeEach(inject(function (_inventory_) {
    inventory = _inventory_;
  }));

  it('should do something', function () {
    expect(!!inventory).toBe(true);
  });

});
