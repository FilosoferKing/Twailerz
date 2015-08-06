/**********************************************************
 YOUTUBE
 **********************************************************/
var video = "";
var title = "";
var title_cut = "";


function pull_video() {
    $.ajax({
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
        method: 'post',
        data: {
            query: title,
            maxResults: 10
        },
        crossDomain: true,
        success: function (response) {
            youtube_video = response.video.id[0];
            console.log("Response: ", youtube_video);
            var frame_div = $('<div>', {
                class: "frame_div",
            });
            video = $('<iframe>', {
                src: "https://www.youtube.com/embed/" + youtube_video,
                class: "iframe"
            });
            $(frame_div).append(video);
            $('.youTube_target').append(frame_div);
            console.log("Video: ", video);
        }
    })
}

function youtube_attach() {
    pull_video();

}


/**********************************************************
 APPLE
 **********************************************************/
var movie_list = [];
var synopsis ='';
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
                synopsis = str.substring(str.lastIndexOf("12px") + 6, str.lastIndexOf('span>') - 4);
                var outerdiv = $('<div>', {
                    class: 'col-sm-3 outerdiv'
                });
                var innerdiv = $('<div>', {
                    class: 'col-sm-12 innerdiv'
                });
                var movieImg = $('<img>', {
                    class: 'images',
                    src: newstring,
                    title: movie_list[i]['title'],
                    'data-toggle': "modal",
                    'data-target': "#myModal"
                });
                $(innerdiv).append(movieImg);
                $(outerdiv).append(innerdiv);
                $('#content').append(outerdiv);
            }
        }, 20);
});

function cut_title() {
    title_cut = title.substring(title.lastIndexOf("-") - 1, title.lastIndexOf(title.length));
    console.log("Cut title: ", title_cut);
    search_tweets = title_cut;
}

function post_title() {
    var text = $('<span>', {
        id: 'main_title',
        text: title_cut
    });
    $('h4').append(text);
    console.log("Append Title: ", title_cut);
}

function post_synopsis(){
    $('.text_target').append(synopsis);
}

/**********************************************************
 TWITTER
 **********************************************************/
//Create GLOBAL variable below here on line 2
var global_result;//global variable to check out the array
var tweets_array = [];//array used to store the text of the most recent tweets
var num_of_tweets_to_use = 15;//variable to designate the number of recent tweets we want to use
var search_tweets= '';


/*****************
 **Purpose: Use the search term to find the most recent matching tweets tweets
 **Runs: On click of Movie title.  Saves movie title as search_tweets global variable
 **Output: Specified Number of divs with twitter image and text of tweet
 *****************/


    function load_twitter(){//make sure this targets the right button/buttons

        console.log('click initiated');
        
        console.log('search_tweets: ' + search_tweets);
        $.ajax({ //grabs the twitter API
            dataType: 'json',
            url: "http://s-apis.learningfuze.com/hackathon/twitter/index.php",
            data: {search_term: search_tweets},//searches tweets for the global variable search_tweets
            crossDomain: true,
            //return: 'url'
            success: function (result) {
                global_result = result;//global_result is really just used to explore the original array
                console.log('loaded ' + result);
                tweet_statuses = result['tweets']['statuses']//saves the first part of array address to a variable for faster load times
                for (i = 0; i < num_of_tweets_to_use; i++) //for loop that runs through the specified number of tweets to find the text
                {


                    tweets_array[i] = tweet_statuses[i]['text']; //saves the array address of the tweet into a new array

                    var send_tweets_img = $("<img>", { //creates the twitter image to dynamically add to html
                        src: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-twitter-48.png',
                    });

                    var send_tweets_div = $("<div>",{//dynamically creates the div container to contain the tweet and image

                        class: 'add_tweet',
                        'tweet_index': i,//each div will be assigned with a tweet_index equivalent to the array number
                    });

                    var send_tweets_text = $('<span>', {//dynamically creates the text from the most recent tweets
                        text: tweet_statuses[i]['text'],
                    });

                    send_tweets_div.append(send_tweets_img,send_tweets_text)//does the appropriate appending
                    $('.twitter_target').append(send_tweets_div);

                }


            }


        });
    };



/**********************************************************
 CLICK FUNCTION
 **********************************************************/
$(document).ready(function () {
    $('body').on('click', '.images', function () {
        $('#main_title').remove();
        $('.frame_div').remove();
        $('.text_target').empty();
        $('.twitter_target').empty();
        title = $(this).attr('title');
        console.log(title);
        cut_title();
        post_title();
        youtube_attach();
        post_synopsis();
        load_twitter();

    });

    $(".modal-wide").on("show.bs.modal", function () {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
    });

});




