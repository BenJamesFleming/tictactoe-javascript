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
