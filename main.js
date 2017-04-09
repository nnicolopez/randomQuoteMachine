$(document).ready(function() {
    getQuote();
    $("#newQuote").on("click", function(){
        getQuote();
    });
});

function getQuote() {
    $.ajaxSetup({ cache: false });
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(quote) {
        var text = quote[0].content + "\n";
        var author = "<cite>" + quote[0].title + "</cite>";

        $("blockquote").html(text + author);
        // var tweetText = text.replace("<p>", "\"").replace("</p>", "\"");
        var tweetText = $("blockquote").text();
        $("#tweetBtn").attr("href", "https://twitter.com/intent/tweet?hashtags=randomQuotes&text=" + textShortener(tweetText));

    });
}
function textShortener(text) {
    var result = text.split("\n");
    var eraseChars = 125 - text.length;
    if (eraseChars < 0) {
        result[0] = result[0].slice(0, eraseChars);
        result[0] = result[0].concat("...");
    }
    result = result[0] + "\n" + result[result.length - 1];
    return result;
}