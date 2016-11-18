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
