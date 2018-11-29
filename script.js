let nextPlayer = 'X';

let winner = null;

let totalMoves = 9;

let scoreX = 0;

let scoreO = 0;

setNextPlayer('X');


// Switches between X and O when an input is clicked
$('input').on('click', function(event) {
  let clicked = event.target;
  if (winner) {
    return;
  } else if ($(clicked).val() === 'X' || $(clicked).val() === 'O') {

  } else if (nextPlayer === 'X') {
    $(clicked).attr('value', nextPlayer);
    clickStyling(clicked);
    $(event.target).val(nextPlayer);
    setNextPlayer('O');
    totalMoves = totalMoves - 1;
  } else {
    clickStyling(clicked);
    $(event.target).val(nextPlayer);
    setNextPlayer('X');
    totalMoves = totalMoves - 1;
  }
  isWinnerX();
  isWinnerO();
  isWinnerNobody();
});

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

// When the Reset Score button is clicked it resets score if desired
$('.reset').on('click', function(event) {
  $('#xScore').text('Player X: ');
  $('#oScore').text('Player O: ');
  scoreX = 0;
  scoreO = 0;
  reset();
});

/* Function that sets styling on winning buttons/prevents any more moves &
prints out that X won with a gif */
function xWon(withButtons) {
    let img = $('<img src="winnerX.gif">');
    $('.winner').append(img);
    $('.restart').css('margin-top', '0px');
    $('.playarea').removeClass('in-progress');
    $(withButtons).css('background', 'rgba(222, 111, 180, 0.71)');
    $(withButtons).css({
        transform: 'scale(1.02)',
      });
    winner = 'X';
    setScore();
}

/* Function that sets styling on winning buttons/prevents any more moves &
prints out that O won with a gif */
function oWon(withButtons) {
    let img = $('<img src="winnerO.gif">');
    $('.winner').append(img);
    $('.restart').css('margin-top', '0px');
    $('.playarea').removeClass('in-progress');
    $(withButtons).css('background', 'rgba(124, 175, 208, 0.73)');
    $(withButtons).fadeOut(0);
    $(withButtons).fadeIn('slow');
    winner = 'O';
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

// Function that checks all winning options for player X
function isWinnerX() {
  if ($('#button1').val() === 'X' && $('#button2').val() === 'X' && $('#button3').val() === 'X') {
    xWon('#button1, #button2, #button3');
  } else if ($('#button4').val() === 'X'&& $('#button5').val() === 'X' && $('#button6').val() === 'X') {
    xWon('#button4, #button5, #button6');
  } else if ($('#button7').val() === 'X' && $('#button8').val() === 'X' && $('#button9').val() === 'X') {
    xWon('#button7, #button8, #button9');
  } else if ($('#button1').val() === 'X' && $('#button5').val() === 'X' && $('#button9').val() === 'X') {
    xWon('#button1, #button5, #button9');
  } else if ($('#button3').val() === 'X' && $('#button5').val() === 'X' && $('#button7').val() === 'X') {
    xWon('#button3, #button5, #button7');
  } else if ($('#button2').val() === 'X' && $('#button5').val() === 'X' && $('#button8').val() === 'X') {
    xWon('#button2, #button5, #button8');
  } else if ($('#button1').val() === 'X' && $('#button4').val() === 'X' && $('#button7').val() === 'X') {
    xWon('#button1, #button4, #button7');
  } else if ($('#button3').val() === 'X' && $('#button6').val() === 'X' && $('#button9').val() === 'X') {
    xWon('#button3, #button6, #button9');
  }
}

// Function that checks all winning options for player O
function isWinnerO() {
  if ($('#button1').val() === 'O' && $('#button2').val() === 'O' && $('#button3').val() === 'O') {
    oWon('#button1, #button2, #button3');
  } else if ($('#button4').val() === 'O' && $('#button5').val() === 'O' && $('#button6').val() === 'O') {
    oWon('#button4, #button5, #button6');
  } else if ($('#button7').val() === 'O' && $('#button8').val() === 'O' && $('#button9').val() === 'O') {
    oWon('#button7, #button8, #button9');
  } else if ($('#button1').val() === 'O' && $('#button5').val() === 'O' && $('#button9').val() === 'O') {
    oWon('#button1, #button5, #button9');
  } else if ($('#button3').val() === 'O' && $('#button5').val() === 'O' && $('#button7').val() === 'O') {
    oWon('#button3, #button5, #button7');
  } else if ($('#button2').val() === 'O' && $('#button5').val() === 'O' && $('#button8').val() === 'O') {
    oWon('#button2, #button5, #button8');
  } else if ($('#button1').val() === 'O' && $('#button4').val() === 'O' && $('#button7').val() === 'O') {
    oWon('#button1, #button4, #button7');
  } else if ($('#button3').val() === 'O' && $('#button6').val() === 'O' && $('#button9').val() === 'O') {
    oWon('#button3, #button6, #button9');
  }
}

// If either one wins the nobodyWon function will run
function isWinnerNobody() {
  if (totalMoves === 0 && winner === null) {
    nobodyWon();
  }
}
