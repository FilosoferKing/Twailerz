/**
 * Created by Andy on 8/5/15.
 */
var movie_list = [];
$(document).ready(function () {
    $.jGFeed('http://trailers.apple.com/trailers/home/rss/newtrailers.rss',
        function (feeds) {
            if (!feeds) {
                return false;
            }
            movie_list = feeds.entries;
            console.log(movie_list);
            for (var i = 0; i < movie_list.length; i++) {
                console.log('looping');
                var str = movie_list[i]['content'];
                var newstring = str.substring(str.lastIndexOf("img src=") + 9, str.lastIndexOf(".jpg") + 4);
                var outerdiv = $('<div>', {
                    class: 'col-sm-3 outerdiv'
                });
                var innerdiv = $('<div>', {
                    class: 'col-sm-12 innerdiv'
                });
                var movieImg = $('<img>', {
                    class: 'images',
                    src: newstring,
                    title: movie_list[i]['title']
                });
                ////CLICK HANDLER
                movieImg.click(function(){console.log('made in the jquery dom creation section')});
                $(innerdiv).append(movieImg);
                $(outerdiv).append(innerdiv);
                $('#content').append(outerdiv);

            }
        }, 20);
});
