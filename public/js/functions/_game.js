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
