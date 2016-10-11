

var Engine = function () {
    "use strict";
    var grid = [6];
    var row;
    var col;
    //               0        1        2        3      4       5
    var colors = ['black', 'green', 'white', 'blue', 'red', 'yellow'];

    var current_player_id = 0;

    var constructor = function() {
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

    this.verify_juxtaposition = function() {
        var test = 0;
        for (row = 0; row < 5; row ++) {
            for (col = 0; col < 5; col ++) {
                test += (grid[row][col] === grid[row+1][col]);
                test += (grid[row][col] === grid[row][col+1]);
            }
        }
        return test === 0;
    };

    this.current_player = function(){
        return current_player_id;
    };

    this.play = function(color){
        var test = false;

        if(grid[0][0] === 'yellow') {
            test = true;
        }
        else if(grid[5][0] === 'yellow') {
            test = true;
        }
        else if(grid[0][5] === 'yellow') {
            test = true;
        }
        else if(grid[5][5] === 'yellow') {
            test = true;
        }

        current_player_id = (current_player_id+1)%2;

        return test;
    };

};
