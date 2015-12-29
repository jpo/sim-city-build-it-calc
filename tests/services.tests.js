describe('Resources Unit Tests', function() {
  var Resources;
  beforeEach(module('app.services'));

  beforeEach(inject(function(_Resources_) {
    Resources = _Resources_;
  }));

  it('can get an instance of my factory', inject(function(Resources) {
    expect(Resources).toBeDefined();
  }));

  it('should have 54 resources', inject(function(Resources) {
    expect(Resources.all().length).toEqual(54);
  }));

  it('should have resources grouped into 10 categories', inject(function(Resources) {
    expect(Object.keys(Resources.allByCategory()).length).toEqual(10);
  }));

  it('has a Metal resource with id 1', inject(function(Resources) {
    expect(Resources.get(1).name).toEqual('Metal');
  }));

  it('has a Green Smoothie resource with 2 required items (shallow)', inject(function(Resources) {
    expect(Resources.getRequiredItems({id: 38}).length).toEqual(2);
  }));

  it('has a Green Smoothie that requires Vegetables and Fruit & Berries', inject(function(Resources) {
    expect(Resources.getRequiredItems({id: 38})[0].name).toEqual('Vegetables');
    expect(Resources.getRequiredItems({id: 38})[1].name).toEqual('Fruit & Berries');
  }));

  it('has a Green Smoothie resource with 8 required items (deep)', inject(function(Resources) {
    expect(Resources.getAllRequiredItems({id: 38}).length).toEqual(8);
  }));
});
