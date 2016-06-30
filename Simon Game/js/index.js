var game = {
  count: 0,
  playerCount: 0,
  color: 0,
  good2go: true,
  simonRunning: false,
  simonTurn: false,
  playerTurn: false,
  strict: false,
  setting: 'off',
  shutoff: false,
  simonArray: [],
  playerArray: [],
  temp: [],
  greenAudio: document.getElementById('green-audio'),
  redAudio: document.getElementById('red-audio'),
  yellowAudio: document.getElementById('yellow-audio'),
  blueAudio: document.getElementById('blue-audio')
};

function startSimon(val) {
  game.simonRunning = true;
  game.color = Math.floor((Math.random() * 4) + 1);
  game.simonArray.push(game.color);
  for (var i = 0; i < val; i++) {
    game.temp.push(game.simonArray[i]);
    colorShow(i);
  }
  endSimon();
  return;
}

function endSimon() {
  setTimeout(function() {
    game.playerTurn = true;
    game.simonTurn = false;
    game.simonRunning = false;
  }, game.temp.length * 1000 + 1000);
  game.temp = [];
  return;
}

function colorShow(i) {
  setTimeout(function() {
    if(game.shutoff || !game.good2go){return;}
    colorPick(game.simonArray[i])
  }, game.temp.length * 1000);
  setTimeout(function() {
    colorPick(game.simonArray[i] + 4)
  }, game.temp.length * 1000 + 500);
  return;
}

function colorPick(num) {
  switch (num) {
    case 1:
      $('.green').css('background-color', '#66FF66');
      game.greenAudio.play();
      break;
    case 2:
      $('.red').css('background-color', '#FF9999');
      game.redAudio.play();
      break;
    case 3:
      $('.yellow').css('background-color', '#FFFFB3');
      game.yellowAudio.play();
      break;
    case 4:
      $('.blue').css('background-color', '#0099FF');
      game.blueAudio.play();
      break;
    case 5:
      $('.green').css('background-color', 'green');
      break;
    case 6:
      $('.red').css('background-color', 'red');
      break;
    case 7:
      $('.yellow').css('background-color', 'yellow');
      break;
    case 8:
      $('.blue').css('background-color', 'blue')
      break;
  };
  return;
}

function simonInitiate() {
  game.simonTurn = true;
  game.playerTurn = false;
  if (game.simonTurn && !game.simonRunning) {
    game.count++;
    $('#value').text(game.count);
    startSimon(game.count);
  }
}

function simonInitiate2() {
  game.simonTurn = true;
  game.playerTurn = false;
  if (game.simonTurn && !game.simonRunning) {
    $('#value').text(game.count);
    startSimon(game.count);
  }
}

function check() {
  console.log('works and player array: ' + game.playerArray);
  if (game.playerArray.shift() === game.simonArray[game.playerCount]) {
    game.playerCount++;
    if (game.playerCount === game.count) {
      if (game.playerCount === 20) {
        var tempMes = $('#value').text();
        $('#value').text('WIN');
        setTimeout(function() {
          reset();
        }, 1500);
        return;
      }
      game.playerCount = 0;
      setTimeout(function() {
        simonInitiate();
      }, 1000);
    }
  } else {
    var tempMes = $('#value').text();
    $('#value').text('!!');
    setTimeout(function() {
      $('#value').text(tempMes);
      if (!game.strict) {
        game.playerCount = 0;
        simonInitiate2();
      }
      if (game.strict) {
        reset();
      }
    }, 1500);
  }
}

function reset() {
  $('#value').text('0');
  game.simonArray = [];
  game.count = 0;
  game.playerCount = 0;
  game.passed = false;
  game.playerTurn = false;
  game.simonTurn = false;
  game.simonRunning = false;
}
//----button click--------------------------
$('#start').click(function() {
  if (game.count === 0 && game.setting === 'on' && game.good2go) {
    simonInitiate();
  }
});
$('.green').click(function() {
  if (game.playerTurn && !game.simonRunning) {
    colorPick(1);
    setTimeout(function() {
      colorPick(5)
    }, 400);
    game.playerArray.push(1);
    check();
  }
});
$('.red').click(function() {
  if (game.playerTurn && !game.simonRunning) {
    colorPick(2);
    setTimeout(function() {
      colorPick(6)
    }, 400);
    game.playerArray.push(2);
    check();
  }
});
$('.yellow').click(function() {
  if (game.playerTurn && !game.simonRunning) {
    colorPick(3);
    setTimeout(function() {
      colorPick(7)
    }, 400);
    game.playerArray.push(3);
    check();
  }
});
$('.blue').click(function() {
  if (game.playerTurn && !game.simonRunning) {
    colorPick(4);
    setTimeout(function() {
      colorPick(8)
    }, 400);
    game.playerArray.push(4);
    check();
  }
});
$('#reset').click(function() {
  if (game.setting === 'off') {
    $('#value').text(0);
    reset();
    game.setting = 'on';
    game.shutoff = false;
  } else if (game.setting === 'on') {
    $('#value').text(' ');
    game.setting = 'off';
    game.shutoff = true;
  }
});
$('#mode').click(function() {
  game.good2go = false;
  if (!game.strict) {
    $('#value').text('STRICT');
    game.strict = true;
    setTimeout(function(){
      game.good2go = true;
      reset();
    },2000);
  } else if(game.strict){
    $('#value').text('NORMAL');
    game.strict = false;
    setTimeout(function(){
      game.good2go = true;
      reset();
    },2000);
  }
});