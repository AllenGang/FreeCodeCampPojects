var game = {
    computerSign: 'o',
    humanSign: 'x',
    moveCount: 0,
    array: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }
  //-------ai move func
function AImove() {
  if (game.moveCount <= 8 && game.moveCount % 2 === 0 && game.computerSign === 'x') {
    move(game.array);
  } else if (game.moveCount <= 8 && game.moveCount % 2 !== 0 && game.computerSign === 'o') {
    move(game.array);
  } else {
    return;
  }
}
//-------reset
function reset() {
  game.moveCount = 0;
  game.array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $('#0').text('');
  $('#1').text('');
  $('#2').text('');
  $('#3').text('');
  $('#4').text('');
  $('#5').text('');
  $('#6').text('');
  $('#7').text('');
  $('#8').text('');
}
//-------checks available moves
function children(arr) {
  var index = [];
  for (var i = 0; i < 9; i++) {
    if (arr[i] === i) {
      index.push(i);
    }
  }
  return index;
};
//--------ai change board
function changeBoard(val, sign) {
  switch (val) {
    case 0:
      $('#0').text(sign);
      break;
    case 1:
      $('#1').text(sign);
      break;
    case 2:
      $('#2').text(sign);
      break;
    case 3:
      $('#3').text(sign);
      break;
    case 4:
      $('#4').text(sign);
      break;
    case 5:
      $('#5').text(sign);
      break;
    case 6:
      $('#6').text(sign);
      break;
    case 7:
      $('#7').text(sign);
      break;
    case 8:
      $('#8').text(sign);
      break;
  };
  return;
}
//--------
function move(arr) {
  var temp = arr;
  if (!win(arr)) {
    if (game.moveCount === 0 && game.computerSign === 'x') {
      game.array[0] = game.computerSign;
      game.moveCount++;
      changeBoard(0, game.computerSign);
      return;
    }
    if (temp[0] === game.humanSign && temp[0] === temp[8] && game.humanSign === 'x' && game.moveCount === 3) {
      game.array[1] = game.computerSign;
      game.moveCount++;
      changeBoard(1, game.computerSign);
      return;
    } else if (temp[2] === game.humanSign && temp[2] === temp[6] && game.humanSign === 'x' && game.moveCount === 3) {
      game.array[1] = game.computerSign;
      game.moveCount++;
      changeBoard(1, game.computerSign);
      return;
    }
    for (var i = 0; i < arr.length; i++) {
      if (temp[i] === i) {
        //win 3 in row
        temp[i] = game.computerSign;
        if (!win(temp)) {
          temp[i] = i;
        } else {
          game.array[i] = game.computerSign;
          game.moveCount++;
          changeBoard(i, game.computerSign);
          return;
        }
      }
    }
    for (var i = 0; i < arr.length; i++) {
      if (temp[i] === i) {
        //block 3 in row
        temp[i] = game.humanSign;
        if (!win(temp)) {
          temp[i] = i;
        } else {
          game.array[i] = game.computerSign;
          game.moveCount++;
          changeBoard(i, game.computerSign);
          return;
        }
      }
    }
    //center
    if (game.array[4] === 4) {
      game.array[4] = game.computerSign;
      game.moveCount++;
      changeBoard(4, game.computerSign);
      return;
    }
    for (var i = 0; i < arr.length; i++) {
      //opposite corner
      if (temp[8] === game.humanSign && temp[i] === 0) {
        game.array[i] = game.computerSign;
        game.moveCount++;
        changeBoard(i, game.computerSign);
        return;
      } else if (temp[6] === game.humanSign && temp[i] === 2) {
        game.array[i] = game.computerSign;
        game.moveCount++;
        changeBoard(i, game.computerSign);
        return;
      } else if (temp[2] === game.humanSign && temp[i] === 6) {
        game.array[i] = game.computerSign;
        game.moveCount++;
        changeBoard(i, game.computerSign);
        return;
      } else if (temp[0] === game.humanSign && temp[i] === 8) {
        game.array[i] = game.computerSign;
        game.moveCount++;
        changeBoard(i, game.computerSign);
        return;
      }
      //empty corner/side
      for (var j = 0; j < arr.length; j++) {
        switch (temp[j]) {
          case 0:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
          case 2:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
          case 6:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
          case 8:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
        };
      }
      for (var j = 0; j < arr.length; j++) {
        switch (temp[j]) {
          case 1:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
          case 3:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
          case 5:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
          case 7:
            game.array[j] = game.computerSign;
            changeBoard(j, game.computerSign);
            game.moveCount++;
            return;
            break;
        };
      }
    }
  }
}

//--------------win check
function win(arr) {
  //row
  for (var i = 0; i < arr.length; i += 3) {
    if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
      return true;
    }
  }
  //column
  for (var i = 0; i <= 2; i++) {
    if (arr[i] === arr[i + 3] && arr[i + 3] === arr[i + 6]) {
      return true;
    }
  }
  //diagonal
  for (var i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (arr[i] === arr[i + j] && arr[i + j] === arr[i + 2 * j]) {
      return true;
    }
  }
  //draw
  var avail = children(game.array);
  if (avail === 0) {
    return true;
  }
}
//---------------------bottom button
$('#chooseX').click(function() {
  game.humanSign = 'x';
  game.computerSign = 'o';
  reset();
  AImove();
  $('#display').text('You Are ' + game.humanSign.toUpperCase());
});
$('#chooseO').click(function() {
  game.humanSign = 'o';
  game.computerSign = 'x';
  reset();
  AImove();
  $('#display').text('You Are ' + game.humanSign.toUpperCase());
});
$('#reset').click(function() {
  reset();
  AImove();
  $('#display').text('You Are ' + game.humanSign.toUpperCase());
});
//-------------------------------human click
$('#0').click(function() {
  if ($('#0').text() === '' && !win(game.array)) {
    game.array[0] = game.humanSign;
    $('#0').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#1').click(function() {
  if ($('#1').text() === '' && !win(game.array)) {
    game.array[1] = game.humanSign;
    $('#1').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#2').click(function() {
  if ($('#2').text() === '' && !win(game.array)) {
    game.array[2] = game.humanSign;
    $('#2').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#3').click(function() {
  if ($('#3').text() === '' && !win(game.array)) {
    game.array[3] = game.humanSign;
    $('#3').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#4').click(function() {
  if ($('#4').text() === '' && !win(game.array)) {
    game.array[4] = game.humanSign;
    $('#4').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#5').click(function() {
  if ($('#5').text() === '' && !win(game.array)) {
    game.array[5] = game.humanSign;
    $('#5').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#6').click(function() {
  if ($('#6').text() === '' && !win(game.array)) {
    game.array[6] = game.humanSign;
    $('#6').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#7').click(function() {
  if ($('#7').text() === '' && !win(game.array)) {
    game.array[7] = game.humanSign;
    $('#7').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});
$('#8').click(function() {
  if ($('#8').text() === '' && !win(game.array)) {
    game.array[8] = game.humanSign;
    $('#8').text(game.humanSign);
    game.moveCount++;
    AImove();
  }
});