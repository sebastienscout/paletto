

var PalettoTestCase64 = TestCase("PalettoTestCase64");

var e;

PalettoTestCase64.prototype.testStory64_1 = function () {
    'use strict';
    e = new Engine(8);

    assertTrue(e.number_marble() === 64);

    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 7; row++){
            assertTrue(e.get_marble_color(e.get_pos_from_grid(row, col)) !==
                   e.get_marble_color(e.get_pos_from_grid(row, col+1)));

            assertTrue(e.get_marble_color(e.get_pos_from_grid(row, col)) !==
                   e.get_marble_color(e.get_pos_from_grid(row+1, col)));
        }
    }

    e.print_log();
 };

PalettoTestCase64.prototype.testStory64_2 = function () {
    'use strict';
    var test_color;
    var cpt = 0;
    while (e.number_marble() > 0 && e.test_winner() < 0 && cpt < 100) {
        test_color = Math.floor(Math.random() * 8);
        e.play(e.get_color[test_color]);
        cpt++; //evite boucle infinie
    }
    e.print_log();
    assertTrue(e.test_winner() >= 0);

};





