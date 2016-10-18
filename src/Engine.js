

var Engine = function () {
    "use strict";
    var grid = [6];
    var row;
    var col;
    //               0        1        2        3      4       5
    var colors = ['black', 'green', 'white', 'blue', 'red', 'yellow'];

    var current_player_id = 0;

    var players = [new Array(6), new Array(6)];

    var constructor = function() {
        for (row = 0; row < 6; row ++) {
            grid[row] = [6];
            players [0] [row] =0;
            players [1] [row] =0;
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

    this.set_marble_color = function (_position, _color) {
        col = _position.charCodeAt(0) - "a".charCodeAt(0);
        row = Number(_position.charAt(1)) - 1;
        grid[row][col] = _color;
    };

    this.get_pos_from_grid = function(_row, _col){
        var col_letter = String.fromCharCode(97 + _col);
        return (col_letter + (_row+1).toString());
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
        var num_play;

        var one_play = this.can_play(color);
        for (num_play = 0; num_play < one_play.length; num_play++) {
            this.set_marble_color(one_play[num_play],'empty');
            players [current_player_id] [colors.indexOf(color)] ++;
            test = true;
        }

        current_player_id = (current_player_id+1)%2;

        return test;
    };
    this.number_marble = function() {
        var test = 0;
        for (row = 0; row < 6; row ++) {
            for (col = 0; col < 6; col ++) {
                test += (grid[row][col] !== 'empty');
            }
        }
        return test;
    };

    this.get_marble_player = function(player,color) {
         return players[player] [colors.indexOf(color)];
    };

    this.is_valid = function(row, col){
        var nb_neighbor = 0;

        nb_neighbor += (row < 5 && grid[row+1][col] !== 'empty');
        nb_neighbor += (row > 0 && grid[row-1][col] !== 'empty');
        nb_neighbor += (col < 5 && grid[row][col+1] !== 'empty');
        nb_neighbor += (col > 0 && grid[row][col-1] !== 'empty');
        return nb_neighbor < 3;
    };

    this.can_play = function(color){
        var pos_colors = [];
        var i = 0;
        for (row = 0; row < 6; row ++) {
            for (col = 0; col < 6; col ++) {
                if(grid[row][col] === color && this.is_valid(row, col)){
                    pos_colors[i] = this.get_pos_from_grid(row, col);
                    i++;
                }
            }
        }
        return pos_colors;
    };


};
