$(document).ready(function() {
  var timer;
  var timerInterval = 400; //time in ms
  //start timer
  $('#search').on('keyup', function() {
    clearTimeout(timer);
    timer = setTimeout(getSearch, timerInterval);
  });
  //clear timer
  $('#search').on('keydown', function() {
    clearTimeout(timer);
  })
});

function getSearch() {
  var searchInput = $('#search').val();
  var list = document.querySelector("ul");
  //console.log(searchInput);

  if (searchInput === "") {
    list.innerHTML = "";
    list.classList.add("hide");
  } else {
    list.innerHTML = "";
    list.classList.add("hide");
    $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&srlimit=10&search=' + searchInput + '&srprop=snippet&callback=?', 'jsonp', function(data) {
      //console.log(data);

      list.classList.remove("hide");
      list.classList.add("well");
      for (var i = 0; i < 10; i++) {
        if (data[3][i] !== undefined) {
          list.innerHTML += "<div class='split'><li><a href='" + data[3][i] + "' target='_blank'>" + data[1][i] + "</a></li>" + "<li>" + data[2][i] + "</li></div><br>";
        }
      }
    });
  }

}