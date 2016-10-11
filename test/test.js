

var PalettoTestCase = TestCase("PalettoTestCase");

var e = new Engine();

PalettoTestCase.prototype.testStory1 = function () {
    'use strict';
    assertTrue(e.get_marble_color("c3") === 'blue');
    assertTrue(e.get_marble_color("e5") === 'yellow');

    assertTrue(e.verify_juxtaposition() === true);

};