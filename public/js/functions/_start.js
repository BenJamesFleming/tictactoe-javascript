var player1 = new Player('Player 1', 'X', [false, 1]);
//var player2 = new Player('Player 2', 'O', [false, 1]);
var player2 = new Player('Computer', 'O', [true, 0.75]);

var game = new Game([player1, player2]);
game.boot();
