var API_url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

var getQuote = function(data) {
  var tweetQuote = 'https://twitter.com/intent/tweet?text=' + data.quoteText + " - " + data.quoteAuthor;
  $("#quote").text(data.quoteText);
  $("#author").text(data.quoteAuthor);
  $(".twitter-share-button").attr("href", tweetQuote);
};

$(document).ready(function() {
  $.getJSON(API_url, getQuote, 'json');
});

$('#quoteBtn').click(function() {
  $.getJSON(API_url, getQuote, 'json');
});