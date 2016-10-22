

var PalettoTestCase = TestCase("PalettoTestCase");

var e;

PalettoTestCase.prototype.testStory1 = function () {
    'use strict';
    e = new Engine();

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

PalettoTestCase.prototype.testStory4 = function () {
    'use strict';

    assertTrue(e.current_player() === 1);
    assertTrue(e.can_play('blue').length > 0);
    assertTrue(e.can_play('black').length  > 0);
    assertTrue(e.can_play('white').length  > 0);
    assertTrue(e.play('black') === true);
    assertTrue(e.get_marble_player(1,"black") === 2);
};

PalettoTestCase.prototype.testStory5 = function () {
    'use strict';
    var e5 = new Engine();
    e5.set_marble_color("a1","empty");
    e5.set_marble_color("a2","empty");
    e5.set_marble_color("a3","empty");
    e5.set_marble_color("a5","empty");
    e5.set_marble_color("a6","empty");
    e5.set_marble_color("b1","empty");
    e5.set_marble_color("b2","empty");
    e5.set_marble_color("b3","empty");
    e5.set_marble_color("b6","empty");
    e5.set_marble_color("c1","empty");
    e5.set_marble_color("c2","empty");
    e5.set_marble_color("d4","empty");
    e5.set_marble_color("d5","empty");
    e5.set_marble_color("d6","empty");
    e5.set_marble_color("e4","empty");
    e5.set_marble_color("e5","empty");
    e5.set_marble_color("e6","empty");
    e5.set_marble_color("f2","empty");
    e5.set_marble_color("f3","empty");
    e5.set_marble_color("f4","empty");
    e5.set_marble_color("f5","empty");
    e5.set_marble_color("f6","empty");

    assertTrue(e5.can_play('black').length > 0);
    assertTrue(e5.can_play('white').length > 0);
    assertTrue(e5.can_play('green').length > 0);
    assertTrue(e5.can_play('red').length > 0);
    assertTrue(e5.can_play('yellow').length === 0);
    assertTrue(e5.can_play('blue').length === 1);

};

PalettoTestCase.prototype.testStory6 = function () {
    'use strict';
    var e6 = new Engine();
    e6.play('black');
    e6.play('green');
    e6.play('yellow');
    e6.play('blue');
    e6.play('white');
    e6.play('red');
    e6.play('blue');
    e6.play('yellow');
    e6.play('black');

    assertTrue(e6.get_winner() === 0);

};

PalettoTestCase.prototype.testStory7 = function () {
    'use strict';
    var e7= new Engine();
    e7.play('black');
    e7.play('yellow');
    e7.play('white');
    e7.play('green');
    e7.play('blue');
    e7.play('white');
    e7.play('red');
    e7.play('blue');
    e7.play('yellow');
    e7.play('black');
    e7.play('green');
    e7.play('red');
    e7.play('white');
    e7.play('blue');
    e7.play('yellow');
    e7.play('green');
    e7.play('blue');
    e7.play('black');
    e7.play('red');

    assertTrue(e7.get_winner() === 0);

};



