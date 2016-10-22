

var Engine = function (_playLength) {
    "use strict";
    var playLength;
    if (_playLength > 6) {
        playLength = _playLength;
    } else {playLength = 6;}

    var grid = [playLength];
    //               0        1        2        3      4       5        6      7
    var colors = ['black', 'green', 'white', 'blue', 'red', 'yellow','cyan','purple'];

    var current_player_id = 0;

    var players = [new Array(playLength), new Array(playLength)];

    var winner = -1;

    function shuffle(a_grid) {
        var rand_index, tmp_index, cpt;
        for (cpt = a_grid.length; cpt; cpt--) {
            rand_index = Math.floor(Math.random() * cpt);
            tmp_index = a_grid[cpt - 1];
            a_grid[cpt - 1] = a_grid[rand_index];
            a_grid[rand_index] = tmp_index;
        }
    }

    function find_next(a_grid,index) {
        var test = a_grid[index];
        while (index < a_grid.length && a_grid[index] === test) {
            index++;
        }
        return index;
    }

    function init_color_temp (a_color_temp,_length) {
        var cpt;
        for (cpt = 0; cpt < (_length * _length); cpt++){
            a_color_temp [cpt] = cpt % _length;
        }
    }

    function import_grid (a_colors_temp,a_grid,_length) {
        for (var row = 0; row < _length; row ++) {
            for (var col = 0; col < _length; col ++) {
                a_grid[row][col] = colors[a_colors_temp[row*_length+col]];
            }
        }
    }

    function test_marble(a_index,a_color_temp,_length) {
        var tmp;
        var index;
        if (a_color_temp[a_index-1] === a_color_temp[a_index]) {
            index = find_next(a_color_temp,a_index);
            tmp = a_color_temp[a_index];
            a_color_temp[a_index] = a_color_temp[index];
            a_color_temp[index] = tmp;
        }
        if (a_color_temp[a_index - _length] === a_color_temp[a_index]){
            if (a_color_temp[a_index-1] === a_color_temp[a_index+1]) {
                index = find_next(a_color_temp, a_index+1);
            } else {
                index = find_next(a_color_temp, a_index);
            }
            tmp = a_color_temp[a_index];
            a_color_temp[a_index] = a_color_temp[index];
            a_color_temp[index] = tmp;
        }
    }

    var init_grid = function(_length) {
        var max = _length * _length;
        var colorsTemp = [];
        init_color_temp(colorsTemp,_length);
        var cpt;
        shuffle(colorsTemp);
        cpt=1;
        while (cpt < max-1) {
            test_marble(cpt,colorsTemp,_length);
            cpt++;
        }

        return colorsTemp;
    };

    var constructor = function() {
        var row;
        for (row = 0; row < playLength; row ++) {
            grid[row] = [playLength];
            players [0] [row] =0;
            players [1] [row] =0;
        }
        var colorsTemp = [];
        if (playLength > 6) {
            colorsTemp = init_grid(playLength);
        } else {
            colorsTemp = [0,1,2,3,4,2,5,2,1,4,5,3,3,5,3,2,0,4,4,0,4,1,3,2,2,1,5,0,5,1,5,3,0,4,1,0];
        }

        import_grid(colorsTemp,grid, playLength);
     };
    constructor();

    this.get_marble_color = function (position) {
        var col = position.charCodeAt(0) - "a".charCodeAt(0);
        var row = Number(position.charAt(1)) - 1;
        return grid[row][col];
    };

    this.set_marble_color = function (_position, _color) {
        var col = _position.charCodeAt(0) - "a".charCodeAt(0);
        var row = Number(_position.charAt(1)) - 1;
        grid[row][col] = _color;
    };

    this.get_pos_from_grid = function(_row, _col){
        var col_letter = String.fromCharCode(97 + _col);
        return (col_letter + (_row+1).toString());
    };

    this.get_grid_from_pos = function (position) {
        var col = position.charCodeAt(0) - "a".charCodeAt(0);
        var row = Number(position.charAt(1)) - 1;
        return [row,col];
    };

    this.verify_juxtaposition = function() {
        var test = 0;
        for (var row = 0; row < playLength-1; row ++) {
            for (var col = 0; col < playLength-1; col ++) {
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

        this.test_winner();
        current_player_id = (current_player_id+1)%2;

        return test;
    };
    this.number_marble = function() {
        var test = 0;
        for (var row = 0; row < playLength; row ++) {
            for (var col = 0; col < playLength; col ++) {
                test += (grid[row][col] !== 'empty');
            }
        }
        return test;
    };

    this.get_marble_player = function(player,color) {
         return players[player] [colors.indexOf(color)];
    };

    //noinspection OverlyComplexFunctionJS
    this.get_neighbors = function (row, col) {

        var neighbor = [];

        if(row < playLength-1 && grid[row+1][col] !== 'empty'){
            neighbor[neighbor.length] = this.get_pos_from_grid(row+1, col);
        }
        if(row > 0 && grid[row-1][col] !== 'empty'){
            neighbor[neighbor.length] = this.get_pos_from_grid(row-1, col);
        }
        if(col < playLength-1 && grid[row][col+1] !== 'empty'){
            neighbor[neighbor.length] = this.get_pos_from_grid(row, col+1);
        }
        if(col > 0 && grid[row][col-1] !== 'empty'){
            neighbor[neighbor.length] = this.get_pos_from_grid(row, col-1);
        }

        return neighbor;
    };

    this.is_valid = function(row, col){
        var neighbors = this.get_neighbors(row, col);
        var nb_neighbor = neighbors.length;

        if(nb_neighbor === 2){
            var testNeighbor = 0;
            var neighbor_neighbors = [];
            var neighbor0 = this.get_grid_from_pos(neighbors[0]);
            var neighbor1 = this.get_grid_from_pos(neighbors[1]);
            neighbor_neighbors[0] = this.get_neighbors(neighbor0[0], neighbor0[1]);
            neighbor_neighbors[1] = this.get_neighbors(neighbor1[0], neighbor1[1]);

            for(var i=0; i<neighbor_neighbors[0].length;i++){
                for(var j=0; j<neighbor_neighbors[1].length; j++){
                    testNeighbor += (neighbor_neighbors[0][i] === neighbor_neighbors[1][j]);
                }
            }

            return testNeighbor === 2;
        }

        return nb_neighbor < 3;
    };

    this.can_play = function(color){
        var pos_colors = [];
        var i = 0;
        for (var row = 0; row < playLength; row ++) {
            for (var col = 0; col < playLength; col ++) {
                if(grid[row][col] === color && this.is_valid(row, col)){
                    pos_colors[i] = this.get_pos_from_grid(row, col);
                    i++;
                }
            }
        }
        return pos_colors;
    };

    this.test_winner = function () {
        for (var index= 0; index<playLength; index++) {
            if (players[current_player_id] [index] === playLength) {
                    winner = current_player_id;
            }
        }
        if (this.number_marble() === 0) { winner = current_player_id; }
        return -1;
    };

    this.get_winner = function () {
        return winner;
    };


    this.print_log = function(){
        console.log("--------------");
        for (var i =0 ; i<playLength ; i++){
            console.log( grid[i][0]+ "\t\t"+ grid[i][1]+ "\t\t"+ grid[i][2]+ "\t\t"+grid[i][3]+ "\t\t"+
                grid[i][4]+ "\t\t"+grid[i][5]+ "\t\t"+grid[i][6]+ "\t\t"+grid[i][7]);
        }
        console.log("--------------");

    };

};
