//element variables
var elSessionTime = document.getElementById('session-time');
var elBreakTime = document.getElementById('break-time');
//setting
$('#session-up').click(function() {
  if (elSessionTime.innerText < 60) {
    elSessionTime.innerText = parseInt(elSessionTime.innerText) + 1;
  }
})
$('#session-down').click(function() {
  if (elSessionTime.innerText > 1) {
    elSessionTime.innerText = parseInt(elSessionTime.innerText) - 1;
  }
})
$('#break-up').click(function() {
  if (elBreakTime.innerText < 60) {
    elBreakTime.innerText = parseInt(elBreakTime.innerText) + 1;
  }
})
$('#break-down').click(function() {
    if (elBreakTime.innerText > 1) {
      elBreakTime.innerText = parseInt(elBreakTime.innerText) - 1;
    }
  })
  //Countdown Function
var countDown = (function($) {
  var timeLength = 10000;
  var currentTime = (new Date()).getTime();
  var endTime = (new Date()).getTime() + timeLength;
  var timeInterval = 1000;
  var running = true;
  var setTimer;

  var updateTimer = function() {
    //till time up
    if (currentTime + timeInterval < endTime) {
      setTimer = setTimeout(updateTimer, timeInterval);
    }
    //if running countdown
    if (running) {
      currentTime += timeInterval;
      if (currentTime >= endTime) {
        alarm();
        //switch session/break when times up
        alternate();
      }
    }
    //update display
    updateDisplay();
  };
  //update display function
  var updateDisplay = function() {
      var time = new Date();
      time.setTime(endTime - currentTime);
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      if(breakState){
        $('#time-display').html('Break Session\n' + (minutes < 10 ? '0' : ' ') + minutes + ': ' + (seconds < 10 ? '0' : ' ') + seconds);
      } else{
        $('#time-display').html('Work Session\n' + (minutes < 10 ? '0' : ' ') + minutes + ': ' + (seconds < 10 ? '0' : ' ') + seconds);
      }
    }
    //control functions
  var pause = function() {
    $('#Pause').hide();
    $('#Resume').show();
    running = false;
  };
  var resume = function() {
    $('#Resume').hide();
    $('#Pause').show();
    running = true;
  };
  var start = function(timeout) {
    if (!running) {
      running = true;
    }
    timeLength = timeout;
    currentTime = (new Date()).getTime();
    endTime = (new Date()).getTime() + timeLength;
    updateTimer();
  };
  var reset = function() {
      running = false;
      clearTimeout(setTimer);
    }
    //return object
  return {
    pause: pause,
    resume: resume,
    start: start,
    reset: reset
  }
})(jQuery);
//
var timerOn = false;
var breakState = false;
//hiding pause resume
$('#Resume').hide();
//audio function
var audio = new Audio('http://soundbible.com/grab.php?id=1599&type=mp3');
var alarm = function(){
  audio.play();
}
//switch to break/work session function
var alternate = function() {
    if (timerOn) {
      if (!breakState) {
        countDown.reset();
        countDown.start(60000 * parseInt(elBreakTime.innerText));
        breakState = true;
        //console.log(breakState);
      }else{
        countDown.reset();
        countDown.start(60000 * parseInt(elSessionTime.innerText));
        breakState = false;
        //console.log(breakState);
      }
    }
  }
  //Clicking start pause reset
$('#Start').click(function() {
  if (!timerOn) {
    countDown.start(60000 * parseInt(elSessionTime.innerText));
    timerOn = true;
  }
});
$('#Pause').click(function() {
  if(timerOn){
    countDown.pause();
  }
});
$('#Resume').click(function() {
  if(timerOn){
    countDown.resume();
  }
});
$('#Reset').click(function() {
  if (timerOn) {
    timerOn = false;
    countDown.reset();
    $('#Pause').show();
    $('#Resume').hide();
  }
});