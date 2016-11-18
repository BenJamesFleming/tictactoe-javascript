function Game (players) {

  var self = this;

  // Game Board Tile Array
  this.board = [];

  // Array of Players
  this.players = players;

  // Current PLayer Id
  this.currentPlayer = 0;

  // Checks For is Won or is Drawn
  this.isWon = false;
  this.isDraw = false;

  // Set Game UI
  this.ui = new GameUI('.grid', '.winner-banner', '.score-keeper', this);

}

// Game Boot
Game.prototype.boot = function () {
  this.ui.emptyGrid();
  this.tileClick();
}

// Tile Click funciton
Game.prototype.tileClick = function () {
  $('.grid-item').each(function () {
    $(this).on('click', function () {

      // Check if Tile has Benn Played and That Game is Running
      if ($(this).html() == '' && !game.isWon) {

        // Add Player Char To HTML
        $(this).html(game.players[game.currentPlayer].char)
               .addClass('played');

        // Confirm PLayers Turn
        game.players[game.currentPlayer].hadTurn = true;

        // Check if The Game is Finshed
        game.checkWin();

      }

    });
  });

  // Build Up Board Array
  this.board[$(this).attr('data-grid--id')] = $(this).html();
}

// Change Active Player
Game.prototype.nextPlayer =  function () {

  if (this.currentPlayer >= (this.players.length - 1)) {
    this.currentPlayer = 0;
  } else {
    this.currentPlayer++;
  }

  // Start The Turn For The AI
  this.players[game.currentPlayer].playMove();
}

// Check if Tile Has Been Played
Game.prototype.checkTile = function (id) {
  if ($('.'+id).html() == '') {
    return true;
  }
  return false;
}

// Check if Game is Finshed
Game.prototype.checkWin = function () {

  // Rebuild The Game Board Array
  $('.grid-item').each(function () {
    game.board[$(this).attr('data-grid--id')] = $(this).html();
  });

  // Grab Curretn Players Character
  var char = this.players[this.currentPlayer].char;

  // Check The Board For Winning Pattens
  if (this.board['00'] == char && this.board['01'] == char && this.board['02'] == char) {
    this.isWon = true;
  } else if (this.board['10'] == char && this.board['11'] == char && this.board['12'] == char) {
    this.isWon = true;
  } else if (this.board['20'] == char && this.board['21'] == char && this.board['22'] == char) {
    this.isWon = true;
  } else if (this.board['00'] == char && this.board['10'] == char && this.board['20'] == char) {
    this.isWon = true;
  } else if (this.board['01'] == char && this.board['11'] == char && this.board['21'] == char) {
    this.isWon = true;
  } else if (this.board['02'] == char && this.board['12'] == char && this.board['22'] == char) {
    this.isWon = true;
  } else if (this.board['00'] == char && this.board['11'] == char && this.board['22'] == char) {
    this.isWon = true;
  } else if (this.board['02'] == char && this.board['11'] == char && this.board['20'] == char) {
    this.isWon = true;
  }

  // If Finshed Alert User And Reset
  if (this.isWon) {

    //alert(this.players[this.currentPlayer].name+" Win's");
    this.ui.setBanner(this.players[this.currentPlayer].name+" Win's");
    this.players[this.currentPlayer].score++;

    this.ui.update();

    // Reset Game Board
    this.reset();
    return;

  // Else Check for Draw
  } else {
    this.isDraw = true;
    for (var key in this.board){
      if (this.board.hasOwnProperty(key)) {
         if (this.board[key] == '') {
           this.isDraw = false;
         }
      }
    }

    // If Draw Alert User And Reset
    if (this.isDraw) {

      //alert("It's A Draw!");
      this.ui.setBanner("It's A Draw!");

      // Reset Game Board
      this.reset();
      return;
    }
  }

  // If The Game is Not Finshed Change To Next Players Turn
  this.nextPlayer();

}

Game.prototype.reset = function () {
  this.board = [];
  this.isWon = false;
  this.isDraw = false;
  this.currentPlayer = 0;
  this.ui.emptyGrid();
}

Game.prototype.fullReset = function () {
  this.reset();
  for (var i=0;i<this.players.length;i++) {
    this.players[i].score = 0;
  }
  this.ui.update();
}

function GameUI (grid, banner, score, game) {

  this.banner = banner;
  this.grid = grid;
  this.score = score;
  this.game = game;

  $(score+'__player_1').html(game.players[0].name);
  $(score+'__player_2').html(game.players[1].name);

  $(score+'__score').on('click', function () {
    game.fullReset();
  });

}

GameUI.prototype.update = function () {

  this.setScore();


}

GameUI.prototype.setBanner = function (msg) {

  $(this.banner).children(this.banner+'__text').html(msg);
  $(this.banner).addClass('open').fadeIn( 400 ).on('click', function () {
    $(this).removeClass('open').fadeOut( 400 );
  });

}

GameUI.prototype.emptyGrid = function () {

  $(this.grid+'-item').empty().removeClass('played');

}

GameUI.prototype.setScore = function () {

  var scoreString = this.game.players[0].score + " : " + this.game.players[1].score;

  $(this.score+'__score').html(scoreString)

}

function Player(name, char, ai) {
  this.name = name;
  this.char = char;
  this.isAI = ai[0];
  this.aiDifficulty = ai[1];
  this.hadTurn = false;
  this.score = 0;
}

Player.prototype.playMove = function () {
  this.hadTurn = false;
  if (this.isAI) {


    var board = game.board;
    var players = game.players;

    // Check For Winning Move
    var canWin = this.checkBoard(board, this.char);
    if (canWin[0] && (this.stragicMoveChance() < this.aiDifficulty)) {
      $('.grid-item.'+canWin[1]).click();
    }

    // Check For Block
    var canBlock = false;
    for (var i=0; i<players.length;i++) {
      if (!this.hadTurn && players[i] != this) {
        canBlock = this.checkBoard(board, players[i].char);
      }
    }
    if (canBlock[0] && (this.stragicMoveChance() < this.aiDifficulty)) {
      $('.grid-item.'+canBlock[1]).click();
    }

    // If No Stragic Move is Made Pick A Random Spot
    if (!this.hadTurn && !game.isWon && !game.isDraw) {
      while (true) {
        var rdn1 = Math.floor(Math.random() * 3);
        var rdn2 = Math.floor(Math.random() * 3);

        if (game.checkTile(''+rdn1+rdn2)) {
          $('.grid-item.'+rdn1+rdn2).click();
          return;
        }
      }
    }
  }
}

Player.prototype.checkBoard = function (board, char) {

  var toReturn = [false, ''];

  for (var i=0;i<3;i++) {
    if (board[i+'0'] == char && board[i+'1'] == char && game.checkTile(i+'2')) {
      toReturn = [true, i+'2'];
    } else if (board[i+'1'] == char && board[i+'2'] == char && game.checkTile(i+'0')) {
      toReturn = [true, i+'0'];
    } else if (board[i+'0'] == char && board[i+'2'] == char && game.checkTile(i+'1')) {
      toReturn = [true, i+'1'];
    }
  }

  for (var i=0;i<3;i++) {
    if (board['0'+i] == char && board['1'+i] == char && game.checkTile('2'+i)) {
      toReturn = [true, '2'+i];
    } else if (board['1'+i] == char && board['2'+i] == char && game.checkTile('0'+i)) {
      toReturn = [true, '2'+i];
    } else if (board['0'+i] == char && board['2'+i] == char && game.checkTile('1'+i)) {
      toReturn = [true, '1'+i];
    }
  }

  if (board['00'] == char && board['11'] == char && game.checkTile('22')) {
    return [true, '22'];
  } else if (board['11'] == char && board['22'] == char && game.checkTile('00')) {
    return [true, '00'];
  } else if (board['00'] == char && board['22'] == char && game.checkTile('11')) {
    return [true, '11'];
  }

  if (board['02'] == char && board['11'] == char && game.checkTile('20')) {
    return [true, '20'];
  } else if (board['11'] == char && board['20'] == char && game.checkTile('02')) {
    return [true, '02'];
  } else if (board['02'] == char && board['20'] == char && game.checkTile('11')) {
    return [true, '11'];
  }

  console.log(toReturn);
  return toReturn;

}

Player.prototype.stragicMoveChance = function () {
  var min = 0;
  var max = 1;
  var chance = Math.random() * max;
  console.log(chance);

  return chance;
}

var player1 = new Player('Player 1', 'X', [false, 1]);
//var player2 = new Player('Player 2', 'O', [false, 1]);
var player2 = new Player('Computer', 'O', [true, 0.75]);

var game = new Game([player1, player2]);
game.boot();
