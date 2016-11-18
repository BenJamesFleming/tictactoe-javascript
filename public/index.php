<!doctype html>
<html>
<head>
  <title>Tic Tac Toe</title>
  <link type="text/css" rel="stylesheet" href="css/main.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
</head>
<body>
  <section class="game">
    <div class="winner-banner">
      <canvas class="winner-banner__canvas" id="world"></canvas>
      <h2 class="winner-banner__text">Player 1 Wins</h2>
    </div>
    <div class="score-keeper">
      <h2 class="score-keeper__player_1"></h2>
      <h2 class="score-keeper__score">0 : 0</h2>
      <h2 class="score-keeper__player_2"></h2>
    </div>
    <table class="grid">
      <tbody>
        <tr class="grid--row row-1">
          <td class="grid-item 00" data-grid--id="00" data-used="false"></td>
          <td class="grid-item 01" data-grid--id="01" data-used="false"></td>
          <td class="grid-item 02" data-grid--id="02" data-used="false"></td>
        </tr>
        <tr class="grid--row row-2">
          <td class="grid-item 10" data-grid--id="10" data-used="false"></td>
          <td class="grid-item 11" data-grid--id="11" data-used="false"></td>
          <td class="grid-item 12" data-grid--id="12" data-used="false"></td>
        </tr>
        <tr class="grid--row row-3">
          <td class="grid-item 20" data-grid--id="20" data-used="false"></td>
          <td class="grid-item 21" data-grid--id="21" data-used="false"></td>
          <td class="grid-item 22" data-grid--id="22" data-used="false"></td>
        </tr>
      </tbody>
    </table>
  </section>
  <script src="js/other/confetti.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
