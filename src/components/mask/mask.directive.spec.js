var compile, scope, directiveElem;

beforeEach(function(){
  module('sampleDirectives');
  
  inject(function($compile, $rootScope){
    compile = $compile;
    scope = $rootScope.$new();
  });
  
  directiveElem = getCompiledElement();
});

it('teste', function () {
  expect(undefined).toBeDefined();
});