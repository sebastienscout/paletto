

var Engine = function () {
    "use strict";
    var grid = [6];
    var row;
    var col;
    //               0        1        2        3      4       5
    var colors = ['black', 'green', 'white', 'blue', 'red', 'yellow'];

    var constructor = function(){
        for (row = 0; row < 6; row ++) {
            grid[row] = [6];
        }
        var colorsTemp = [0,1,2,3,4,2,5,2,1,4,5,3,3,5,3,2,0,4,4,0,4,1,3,2,2,1,5,0,5,1,5,3,0,4,1,0];


        for (row = 0; row < 6; row ++) {
            for (col = 0; col < 6; col ++) {
                grid[row][col] = colors[colorsTemp[row*6+col]];
            }
        }

    };
    constructor();

    this.get_marble_color = function (position) {
        col = position.charCodeAt(0) - "a".charCodeAt(0);
        row = Number(position.charAt(1)) - 1;
        return grid[row][col];
    };
// private attributes and methods



// public methods
};
