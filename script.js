let nextPlayer = 'X';

let winner = null;

let totalMoves = 9;

let scoreX = 0;

let scoreO = 0;

setNextPlayer('X');

// Prevents making any more moves when winner is found/an input is already clicked
$('input').on('click', function(event) {
  if (winner || $(event.target).val().trim().length) {
    return;
  } else {
    makeMove(nextPlayer, event.target);
  }
  isWinner('X');
  isWinner('O');
  isWinnerNobody();
});

// Switches between X and O when a player makes a move
function makeMove(player, button) {
  $(button).val(nextPlayer);
  clickStyling(button);
  if (player === 'X') {
    setNextPlayer('O');
  } else {
    setNextPlayer('X');
  }
  totalMoves = totalMoves - 1;
}

// Sets styling on clicked buttons
function clickStyling(clicked) {
  $(clicked).css('background-color', 'rgba(255, 255, 255, 0.4)');
  $(clicked).css('text-shadow', '1px 1px 1px #000000d4');
  if ($(clicked).val() === 'X') {
    $(clicked).css('color', '#000');
  } else {
    $(clicked).css('color', '#fff');
  }
}

// Restart function that resets game
 function reset() {
   winner = null;
   $('input').val('');
   $('input').removeAttr('style');
   $('.restart').css('margin-top', '30px');
   $('.winner img').remove();
   $('.playarea').addClass('in-progress');
   $('#xScore').removeClass('doBlink');
   $('#oScore').removeClass('doBlink');
   $('div p').text('');
   totalMoves = 9;
 }

// When the New Game button is clicked the reset function runs
$('.restart').on('click', function(event) {
   reset();
});

// When the Reset Score button is clicked it resets score
$('.reset').on('click', function(event) {
  $('#xScore').text('Player X: ');
  $('#oScore').text('Player O: ');
  scoreX = 0;
  scoreO = 0;
  reset();
});

// Function that sets styling on winning buttons & prints out which player won with a gif
function setWinner(ourWinner, withButtons) {
    $('.restart').css('margin-top', '0px');
    $('.playarea').removeClass('in-progress');
    if (ourWinner === 'X') {
      withButtons.css('background', 'rgba(222, 111, 180, 0.71)');
      withButtons.css({ transform: 'scale(1.02)' });
      let img = $('<img src="winnerX.gif">');
      $('.winner').append(img);
    } else if (ourWinner === 'O') {
      withButtons.css('background', 'rgba(124, 175, 208, 0.73)');
      withButtons.fadeOut(0);
      withButtons.fadeIn('slow');
      let img = $('<img src="winnerO.gif">');
      $('.winner').append(img);
    }
    winner = ourWinner;
    setScore();
}

// Updates score for player X or player O depending on who won
function setScore() {
  if (winner === 'X') {
    scoreX++;
    $('#xScore').text('Player X: ' + scoreX);
    $('#xScore').addClass('doBlink');
    setTimeout(function() {
      $('#xScore').removeClass('doBlink');
    }, 2500);
  } else if (winner === 'O') {
    scoreO++;
    $('#oScore').text('Player O: ' + scoreO);
    $('#oScore').addClass('doBlink');
    setTimeout(function() {
      $('#oScore').removeClass('doBlink');
    }, 2500);
  }
}

// Function that writes out the text 'It's a straw' if nobody won
function nobodyWon() {
  $('p').text('It\'s a straw!');
  $('.restart').css('margin-top', '0px');
}

// Indicates whose turn it is to make a move with an underline
function setNextPlayer(player) {
  nextPlayer = player;
  if (player === 'X') {
    $('#xScore').css('text-decoration', 'underline');
    $('#oScore').css('text-decoration', 'none');
  } else if (player === 'O') {
    $('#xScore').css('text-decoration', 'none');
    $('#oScore').css('text-decoration', 'underline');
  }
}

// Checks if the buttons has any of the same values
function buttonsHasValue(buttons, value) {
  for (let button of buttons) {
    if ($(button).val() !== value) {
      return false;
    }
  }
  return true;
}

// Function that checks all possible winning options for players and sets the winner
function isWinner(player) {
  let buttonRows = [
    $('#button1, #button2, #button3'),
    $('#button4, #button5, #button6'),
    $('#button7, #button8, #button9'),
    $('#button1, #button5, #button9'),
    $('#button3, #button5, #button7'),
    $('#button1, #button4, #button7'),
    $('#button2, #button5, #button8'),
    $('#button3, #button6, #button9'),
  ];

  for (let buttonRow of buttonRows) {
    if (buttonsHasValue(buttonRow, player)) {
      setWinner(player, buttonRow);
      return;
    }
  }
}

// If either one wins the nobodyWon function will run
function isWinnerNobody() {
  if (totalMoves === 0 && winner === null) {
    nobodyWon();
  }
}
