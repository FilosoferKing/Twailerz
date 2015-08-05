/**
 * Created by Andy on 8/5/15.
 */
var movie_list = [];
$(document).ready(function () {
    $.jGFeed('http://trailers.apple.com/trailers/home/rss/newtrailers.rss',
        function (feeds) {
            // Check for errors
            if (!feeds) {
                // there was an error
                return false;
            }
            movie_list = feeds.entries;
            console.log(movie_list);
            // do whatever you want with feeds here
        }, 20);
});

$(document).ready(function () {
    $('#load').click(function () {
        for (var i = 0; i < movie_list.length; i++) {
            var moviedivs = $('<button>',{
                class: 'col-xs-6 btn btn-warning',
                id: movie_list[i].title,
                html: movie_list[i].title
            });
            $('.container').append(moviedivs);

        }
    })
});