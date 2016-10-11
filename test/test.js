

var PalettoTestCase = TestCase("PalettoTestCase");

var e = new Engine();

PalettoTestCase.prototype.testStory1 = function () {
    'use strict';
    assertTrue(e.get_marble_color("c3") === 'blue');
    assertTrue(e.get_marble_color("e5") === 'yellow');
    assertTrue(e.verify_juxtaposition() === true);

};

PalettoTestCase.prototype.testStory2 = function () {
    'use strict';

    assertTrue(e.current_player() === 0);
    assertTrue(e.play('yellow') === true);

};

PalettoTestCase.prototype.testStory3 = function () {
    'use strict';


    assertTrue(e.get_marble_color("a6") === 'empty');
    assertTrue(e.number_marble() === 35);
    assertTrue(e.get_marble_player(0,"yellow") === 1);
};